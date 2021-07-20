const express = require('express');
const app = express();
const routerVista = express.Router();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
//mongo
const mongoose = require('mongoose');
const mensaje = require('./models/mensaje');
const config = require('./config.json');


const messages = [
    { author: 'bot', date:  new Date().toLocaleString('en-US'), text: '¡Hola! ¿Que tal?' },

];

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
     socket.on('new-message', async function (data) {
        try{
        messages.push(data);
        io.sockets.emit('messages', messages);
        await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        await mensaje.create(messages[messages.length-1]);
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
