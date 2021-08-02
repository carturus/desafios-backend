const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//mongo
const mongoose = require('mongoose');
const mensaje = require('./models/mensaje');
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


//Mongo session
const MongoStore=require('connect-mongo')
const advancedOptions={useNewUrlParser:true, useUnifiedTopology: true}

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://prueba:prueba@cluster0.lnfsl.mongodb.net/sesiones?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    rolling:true,
    cookie: { maxAge: 60000 },
}))

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

io.on('connection', async socket => {
 try{
    /* Envio los mensajes al cliente que se conectó */
     socket.on('new-message', async function (message) {
        try{
        await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await mensaje.create(message)
        const arrayData=await mensaje.find({})
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

//Rutas Plantillas

app.get('/login',(req,res)=>{ 
    res.render('login')
})  

app.post('/login',(req,res)=>{

    if (!req.body.user) {
        res.send('login fallo');
    } else {
        console.log(req.body.user)
       req.session.user = req.body.user;
        res.redirect('/guardar')
    }    
})

app.get('/logout',(req,res)=>{
    req.session.destroy(err => {
        if (!err) res.render('login')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

app.get('/guardar',(req,res)=>{ 
    if(req.session.user){
    let user=req.session.user
    let time=req.session.cookie.maxAge/1000
    res.render('guardar',{user,time})
    }
    else{
      res.render('login')  
    } 
})  

app.get('/vista',(req,res)=>{
    res.render('vista',{productos:items.listar(), hayProductos: items.listar().error== undefined})
 })

//Rutas API
const productosRouter = require('./routes/productosRouter');
app.use('/productos', productosRouter);

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || 8080;

// pongo a escuchar el servidor en el puerto indicado
const server = http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
