const express = require('express');
const app = express();
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));

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
}))

//  PASSPORT FACEBBOK
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: '523224885615441',
  clientSecret: '18ee52bd1c69f1daa5e4e930ee7a79f5',
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'name','displayName', 'picture.type(large)', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  console.log(JSON.stringify(profile, null, 3));
  let userProfile = profile;
  return done(null, userProfile);
}));
 
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
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
  socket.emit('mi mensaje', 'este es mi mensaje desde el servidor');

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
app.get('/loginfailed',(req,res)=>{
  res.render('loginfailed')
})

//authenticacion Facebook ('facebook', { scope : 'email' })
app.get('/auth/facebook',  passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/inicio',
        failureRedirect: '/loginfailed'
    }
));

//Logout
app.get('/logout',(req,res)=>{
  req.logout()
  res.render('login')
})

app.get('/inicio',(req,res)=>{ 
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/index.html');
  }
  else {
    console.log('user NO logueado');
    res.render('login') ;
}
})

app.get('/profile',(req,res)=>{
  if (req.isAuthenticated()) {
    let user = req.user
    let userData={
      name:user.name.familyName+" "+user.name.givenName,
      mail:user.emails[0].value,
      picture:user.photos[0].value
    }
     res.json(userData)
  }
  else {
    console.log('user NO logueado');
    res.render('login') ;
}

})
app.get('/vista',checkAuthentication,async (req,res)=>{
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
