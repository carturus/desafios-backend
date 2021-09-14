const express = require('express');
const app = express();
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

//mongo
const mongoose = require('mongoose');
const {User,Mensaje} = require('./models/models');
const config = require('./config.json');

//normalizr
const { normalize,schema } = require('normalizr');
const schemaAuthor = new schema.Entity('author',{},{idAttribute:'mail'});
const schemaPost = new schema.Entity('posts',{
        author:schemaAuthor
},{idAttribute:'_id'})
const schemaMensaje= new schema.Entity('mensajes',{
    posts: [schemaPost]
})

// Sessions
const session = require('express-session')
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    rolling:true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000,
      },
}))

//  PASSPORT
const passport = require('passport');
const bCrypt = require('bCrypt');
const LocalStrategy = require('passport-local').Strategy;

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
            //req.flash('message', 'User Not found.'));                 
            console.log('message', 'User Not found.'));                 
          }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false,console.log('message', 'Invalid Password'));
          }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
  })
);

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // Busco usurio en mongo
      User.findOne({'username':username},function(err, user) {
        // En caso de error
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // Si exite el usuaio
        if (user) {
          console.log('El usuario existe');
          return done(null, false,console.log('message','User Already Exists'));
        } else {
          // Si no existe,cre usuario
          var newUser = new User();
          // Seteo nuevas credenciales
          newUser.username = username;
          newUser.password = createHash(password);
          // Guardo nuevo usuario
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');  
            console.log(newUser)  
            return done(null, newUser);
          });
        }
      });
    }
    process.nextTick(findOrCreateUser);
  })
)
  // Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
   
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

//Configiracion de Handlebars
const handlebars = require('express-handlebars');
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", __dirname + '/views');

//Seccion mensajes
io.on('connection', socket => {
 try{
  //Productos socket

  socket.on('update', async function(){
    try{
      let productos= await items.vista()
      io.sockets.emit('productos',productos);
    }
    catch(e){
      console.log("Error socket servidor",e)
    }
  })

    /* Envio los mensajes al cliente que se conectó */
     socket.on('new-message', async function (message) { 
        try{
        await mongoose.connect(config.MONGO_DESAFIOS_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await Mensaje.create(message)
        const arrayData=await Mensaje.find({})
        const dataMensajes={id:1000,nombre:'Centro de mensajes', posts:arrayData}    
        const normalizedMensajes= normalize(JSON.parse(JSON.stringify(dataMensajes, null, 3)),schemaMensaje)
        io.sockets.emit('messages',normalizedMensajes);
     }
        catch{
       console.log("no se pudieron guardar mensajes")
        }              
    });
 }catch{
    console.log("no se pudieron guardar mensajes")
 }
});
// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

//Login
app.get('/',(req,res)=>{ 
  res.render('login')
})  
app.get('/login',(req,res)=>{ 
    res.render('login')
})  
app.post('/login',  passport.authenticate('login', { failureRedirect: '/loginfailed' }), (req,res)=>{
  res.redirect('/guardar')
});
app.get('/loginfailed',(req,res)=>{
  res.render('loginfailed')
})

//Sign UP
app.get('/signup',(req,res)=>{ 
  res.render('signup')
}) 
app.post('/signup',  passport.authenticate('signup', { failureRedirect: '/signupfailed' }), (req,res)=>{
  res.redirect('/login')  
});
app.get('/signupfailed',(req,res)=>{
res.render('signupfailed')
})
//Logout
app.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        if (!err) res.render('login')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

app.get('/guardar',(req,res)=>{ 
  if (req.isAuthenticated()) {
    let user = req.user;
    let time=req.session.cookie.maxAge/1000;
    res.sendFile(__dirname + '/public/index.html');
   // res.render('guardar', {usuario: user.username,time});
  }
  else {
    console.log(req.isAuthenticated())
    console.log('user NO logueado');
    res.render('login') ;
}
})  
app.get('/vista',async (req,res)=>{
    res.render('vista',{productos: await items.vista()})
 })

//mildware para proteger rutas
 function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else{
      res.redirect("/login");
  }
}

//Rutas API
const productosRouter = require('./routes/productosRouter');
app.use('/productos',checkAuthentication,productosRouter);

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT,async() => {
    //conecto base de datos para passport
    try{
    await mongoose.connect(config.MONGO_DESAFIOS_URL, { useNewUrlParser: true, useUnifiedTopology: true });
   }
   catch(err){
     console.log("erro mongo",err)
   }
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
