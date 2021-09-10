const express = require('express');
const app = express();
const http = require('http').Server(app);
const config = require('./config.json');
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const middlewares= require('./middleware/middlewares')
const dotenv = require('dotenv');
dotenv.config();
const { fork } = require('child_process');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const {loggerConsola,loggerWarn,loggerError}= require('./utils/logers')

//mongo
const mongoose = require('mongoose');
const {User} = require('./models/models');

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
        if (err){ 
          loggerError.error('Error in Login: '+err);
          return done(err); }
          
        if (!user){
          loggerWarn.warn('User Not Found with username '+username)
          return done(null, false,                 
            console.log('message', 'User Not found.'));                 
          }
        if (!isValidPassword(user, password)){
          loggerWarn.warn('Invalid Password')
          return done(null, false,console.log('message', 'Invalid Password'));
          }
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
      User.findOne({'username':username},function(err, user) {
        // En caso de error
        if (err){
          loggerError.error('Error in SignUP: '+err); 
          return done(err);
        }
        // Si exite el usuaio
        if (user) {
          loggerConsola.info('El usuario existe');
          return done(null, false,console.log('message','User Already Exists'));
        } else {
          // Si no existe,cre usuario
          var newUser = new User();
          // Seteo nuevas credenciales
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.correo= req.body.correo;
          newUser.nombre = req.body.nombre;
          newUser.direccion =req.body.direccion;
          newUser.edad = req.body.edad;
          newUser.telefono = req.body.telefono;
          // Guardo nuevo usuario
          newUser.save(function(err) {
            if (err){
              loggerError.error('Error in Saving user: '+err);  
              throw err;  
            }
             loggerConsola.info('User Registration succesful',newUser);   
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

// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});

// importo router producto,carrito y acceso
const productosRouter = require('./routes/productos');
const carritoRouter = require('./routes/carrito');
const authRouter = require('./routes/auth');
const storeRouter = require('./routes/store');
app.use('/productos',productosRouter);
app.use('/carrito',middlewares.checkAuthentication,carritoRouter);
app.use('/auth', authRouter);
app.use('/',middlewares.checkAuthentication, storeRouter);
app.get('/', (req, res) => {
    res.redirect('/auth/login')
  })

//MODO o CLUSTER dependiendo de variable en process.env.MODO
if ((process.env.MODO=='FORK')?false:cluster.isMaster) {
  loggerConsola.info('num CPUs', numCPUs)
  loggerConsola.info(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
      cluster.fork(); // creamos un worker para cada cpu
  }
  // controlamos la salida de los workers
  cluster.on('exit', worker => {
    loggerConsola.info('Worker', worker.process.pid, 'died');
  });

} else {
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

}
