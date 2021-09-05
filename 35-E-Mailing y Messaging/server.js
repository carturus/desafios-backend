const express = require('express');
const app = express();
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
const { fork } = require('child_process');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const fetch = require('node-fetch')
const fs = require('fs')
let profileFacebook={};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));

//mongo
const mongoose = require('mongoose');
const { Mensaje } = require('./models/models');
const config = require('./config.json');

//normalizr
const { normalize, schema } = require('normalizr');
const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'mail' });
const schemaPost = new schema.Entity('posts', {
  author: schemaAuthor
}, { idAttribute: '_id' })
const schemaMensaje = new schema.Entity('mensajes', {
  posts: [schemaPost]
})

// Sessions
const session = require('express-session')
app.use(session({
  secret: 'secreto',
  resave: true,
  saveUninitialized: true,
  rolling: true,
}))

//  PASSPORT FACEBBOK
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
dotenv.config();
//Set clientID -clientSecret
let clientID = process.argv[2]
let clientSecret = process.argv[3]
const setFacebook = (pClienteID, pClientSecret) => {
  pClienteID ? clientID = pClienteID : clientID = process.env.FACEBOOK_CLIENT_ID
  pClientSecret ? clientSecret = pClientSecret : clientSecret = process.env.FACEBOOK_CLIENT_SECRET
}
setFacebook(clientID, clientSecret)
const setProfileFacebook=(profile)=>{
  profileFacebook= {
    name: profile.name.familyName + " " + profile.name.givenName,
    mail: profile.emails[0].value,
    picture: profile.photos[0].value
  }
  fetch(profileFacebook.picture)
    .then(res =>
      res.body.pipe(fs.createWriteStream('imagenProfile.jpeg'))
    )
}
passport.use(new FacebookStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture.type(large)', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
     setProfileFacebook(profile)
     sendMail('login')
  return done(null, profile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

//GZIP
const compression = require('compression');
app.use(compression());

//LOG4JS -> Se aplica en /random
const log4js = require("log4js");
log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarn: { type: 'file', filename: 'warn.log' },
    miLoggerError: { type: 'file', filename: 'error.log' },

  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "info" },
    fileWarn: { appenders: ["miLoggerWarn", "miLoggerConsole"], level: "warn" },
    fileError: { appenders: ["miLoggerError", "miLoggerConsole"], level: "error" },
  }
});
const loggerConsola = log4js.getLogger('consola');
const loggerWarn = log4js.getLogger('fileWarn');
const loggerError = log4js.getLogger('fileError');

//NODE MAILER
const nodemailer = require('nodemailer');

const transporterEtheral = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'selmer.zulauf75@ethereal.email',
    pass: 'y6ujad7EnbPQumZNAU'
  }
});

const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


const sendMail=(operation)=>{
 let fecha= new Date().toLocaleString('en-US')
  let mailOptions = {
    from: 'Servidor Node.js',
    to: process.env.MAIL,
    subject: profileFacebook.name+" "+operation+"a las"+fecha,
    html: `<h1 style="color: blue;">${operation} sesion facebook <span style="color: green;"> 
    <br>correo: ${profileFacebook.mail}
    <br>usuario: ${profileFacebook.name} a las ${fecha}
    </span></h1>`,
    attachments: [
      {   // filename and content type is derived from path
        path: 'imagenProfile.jpeg'
      }
    ]
  }
  
transporterEtheral.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  //console.log(info)
  console.log(profile)
});

transporterGmail.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err)
    return err
  }
  console.log(info)
});

}

//SMS TWILIO
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 
 
const sendSMS=(mensaje)=>{
client.messages 
      .create({ 
         body: `Usuario: ${mensaje.author.name} Fecha:${mensaje.date} Texto:${mensaje.text}`,  
         messagingServiceSid: 'MG9baeec677239b2550463dc58c9804181',      
         to: process.env.MOVIL
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      }
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

  try {
    //Productos socket
    socket.on('update', async function () {
      try {
        let productos = await items.vista()
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

//Login
app.get('/', (req, res) => {
  res.render('login')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/loginfailed', (req, res) => {
  res.render('loginfailed')
})

//authenticacion Facebook ('facebook', { scope : 'email' })
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  {
    successRedirect: '/inicio',
    failureRedirect: '/loginfailed'
  }
));

//Logout
app.get('/logout', (req, res) => {
  sendMail('logout')
  req.logout()
  res.render('login')
})

app.get('/inicio', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/index.html');
  }
  else {
    console.log('user NO logueado');
    res.render('login');
  }
})

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(profileFacebook)
  }
  else {
    console.log('user NO logueado');
    res.render('login');
  }

})
app.get('/vista', checkAuthentication, async (req, res) => {
  res.render('vista', { productos: await items.vista() })
})
//Ruta info
app.get('/info', (req, res) => {
  let info = {
    argumentos: process.argv,
    plataforma: process.platform,
    version: process.version,
    pid: process.pid,
    path: process.execPath,
    memoria: process.memoryUsage(),
    carpeta: process.cwd(),
    CPUS: numCPUs
  }
  //console.log(info)
  res.json(info)
})

//ruta random
app.get('/random', (req, res) => {
  let cant = 0;
  try {
    if (req.query.cant == undefined) {
      cant = 100000000
    } else {
      if (isNaN(req.query.cant)) {
        throw new Error('Cantidad no es un numero')
      } else {
        cant = req.query.cant
      }
    }
    cant > 1000 ? loggerWarn.warn("La cantidad es muy grande") : loggerConsola.info("Se hara calculo")
    const computo = fork('./computo.js');
    computo.send(cant);
    computo.on('message', numbers => {
      res.json(numbers);
    }
    );
  }
  catch (error) {
    loggerError.error('No se puede realizar calculo', error)
    res.send('No se puede hacer calculo, Cantidad no es un numero')
  }

})

//mildware para proteger rutas
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
//Rutas API
const productosRouter = require('./routes/productosRouter');
const { date } = require('faker');
app.use('/productos', checkAuthentication, productosRouter);


//Arranco servidor en modo FORk o modo CLuster
let modoFork = process.argv[4]
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
  //const PORT = process.env.PORT || 8080;
  const PORT = parseInt(process.argv[5]) || 8081
  // pongo a escuchar el servidor en el puerto indicado
  const server = http.listen(PORT, async () => {
    //conecto base de datos para passport
    try {
      await mongoose.connect(config.MONGO_DESAFIOS_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
