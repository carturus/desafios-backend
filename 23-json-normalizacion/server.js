const express = require('express');
const app = express();
const routerVista = express.Router();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
const fs = require('fs')
//mongo
const mongoose = require('mongoose');
const mensaje = require('./models/mensaje');
const config = require('./config.json');

const messages = [
    { author: {mail:'bot@clientes', name:'atencion',age:1000, username:'bot'}, date:  new Date().toLocaleString('en-US'), text: '¡Hola! ¿Que tal?' },

];

//normalizr
const { normalize,schema } = require('normalizr');
const schemaAuthor = new schema.Entity('author',{},{idAttribute:'mail'});
const schemaPost = new schema.Entity('posts',{
        author:schemaAuthor
},{idAttribute:'_id'})

const schemaMensaje= new schema.Entity('mensajes',{
    posts: [schemaPost]
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/',routerVista)

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

routerVista.get('/guardar',(req,res)=>{ 
     res.render('guardar')
     
})  
routerVista.get('/vista',(req,res)=>{
    res.render('vista',{productos:items.listar(), hayProductos: items.listar().error== undefined})
 })


//Rutas API

const productosRouter = require('./routes/productosRouter');
const { stringify } = require('querystring');
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
