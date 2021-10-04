const express = require('express');
const app = express();
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const middlewares= require('./middleware/middlewares')
const session = require('express-session')
const mongoose = require('mongoose');
const config = require('./config.js');
const { Mensaje } = require('./models/models');
const {normalize,schemaMensaje} =require('./utils/normalizr')
const {sendSMS} = require('./utils/senderNotications');
const compression = require('compression');
const handlebars = require('express-handlebars');
const { graphqlHTTP } = require('express-graphql');
const{root,schema} =require('./graphl/graphl')

//MODO FORK o CLUSTER
let modoFork=config.MODO;
//TIPO PERSISTENCIA
const persistencia=config.PERSISTENCIA;


//Puerto
const args= require('yargs').argv
const PORT = args.port|| 8080

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

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
require('./passport/passport')

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

//centro de mensajes
io.on('connection', socket => {
  socket.emit('mi mensaje', 'este es mi mensaje desde el servidor');
  try {
    //Productos socket
    socket.on('update', async function () {
      try {
        let productos = await items.listar()
        io.sockets.emit('productos', productos);
      }
      catch (e) {
        console.log("Error socket servidor", e)
      }
    })
    /* Envio los mensajes al cliente que se conectó */
    socket.on('new-message', async function (message) {
      try {
        //send SMS
        
        message.text.toUpperCase().includes("ADMINISTRADOR")&&sendSMS(message)
        await Mensaje.create(message)
        const arrayData = await Mensaje.find({})
        const dataMensajes = { id: 1000, nombre: 'Centro de mensajes', posts: arrayData }
        const normalizedMensajes = normalize(JSON.parse(JSON.stringify(dataMensajes, null, 3)), schemaMensaje)
        io.sockets.emit('messages', normalizedMensajes);
      }
      catch {
        console.log("no se pudieron guardar mensajes")
      }
    });
  } catch {
    console.log("no se pudieron guardar mensajes")
  }
});

// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).send('Algo se rompio!');
});

//Rutas
app.get('/', (req, res) => {
  res.redirect('/auth/login')
})
const productosRouter = require('./routes/productosRouter');
app.use('/productos', productosRouter);
const ejerciciosRouter = require('./routes/ejerciciosRouter');
app.use('/ejercicios', ejerciciosRouter)
const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter)
const vistasRouter = require('./routes/vistasRouter');
app.use('/',middlewares.checkAuthentication,vistasRouter)


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


