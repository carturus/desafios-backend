const express = require('express');
const app = express();
const router = express.Router();
const routerVista = express.Router();
const handlebars = require('express-handlebars');
const http = require('http').Server(app);
const items = require('./api/productos');
const io = require('socket.io')(http);
const {persistenciaMensajes}= require('./knex/accesoSqlite');


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
    console.log('Nuevo cliente conectado!');
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', items.listar());

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        io.sockets.emit('productos', items.listar());
    });
     socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
        //Persistencia en SQL3
        persistenciaMensajes(messages)                
    });


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
