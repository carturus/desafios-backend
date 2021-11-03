const express = require('express');
const app = express();
const http = require('http').Server(app);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const session = require('express-session')
const mongoose = require('mongoose');
const config = require('./config.js');
const compression = require('compression');
const handlebars = require('express-handlebars');
const {checkToken}= require('./jwt/jwt')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//MODO FORK o CLUSTER
let modoFork=config.MODO;
//TIPO PERSISTENCIA
const persistencia=config.PERSISTENCIA;

//Puerto
const args= require('yargs').argv
const PORT = args.port|| 8080


// Sessions
app.use(session({
  secret: 'secreto',
  resave: true,
  saveUninitialized: true,
  rolling: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(compression());

//  PASSPORT FACEBBOK
const passport = require('passport');
require('./passport/passportLocal')
app.use(passport.initialize());
app.use(passport.session());

//Configiracion de Handlebars
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
  return res.status(500).render('loginfailed');
});

//Rutas
app.get('/', (req, res) => {
  res.redirect('/auth/login')
})
const productosRouter = require('./routes/productosRouter');
app.use('/productos', checkToken ,productosRouter);
const carritoRouter = require('./routes/carritoRouter');
app.use('/carrito',checkToken , carritoRouter);
const ordenesRouter = require('./routes/ordenesRouter');
app.use('/ordenes',checkToken , ordenesRouter);
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter)
const storeRouter = require('./routes/storeRouter');
app.use('/store',checkToken ,storeRouter);

if ((modoFork == undefined || modoFork == 'FORK') ? false : cluster.isMaster) {
  console.log('num CPUs', numCPUs)
  console.log(`PID MASTER ${process.pid}`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // creamos un worker para cada cpu
  }
  // controlamos la salida de los workers
  cluster.on('exit', worker => {
    console.log('Worker', worker.process.pid, 'died');
  });
} else {
 
 
  // Pongo a escuchar el servidor en el puerto indicado
  const server = http.listen(PORT, async () => {
    try {
      //iniciamos Mongo para las basde usuarios 
      await mongoose.connect(config.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    catch (err) {
      console.log("erro mongo", err)
    }
    console.log(`servidor escuchando en http://localhost:${PORT}`);
  });
  // en caso de error, avisar
  server.on('error', error => {
    console.log('error en el servidor:', error);
  });

}
//Impirmir codigo salida
process.on('beforeExit', (code) => {
  console.log('el codigo recibido', code);
});


