const express = require('express');
const app = express();
const router = express.Router();
const items = require('./api/productos');

let id=0;
// creo una app de tipo express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/static', express.static(__dirname + '/public'));

// completar el codigo...


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

router.get('/',(req,res)=>{

    res.send(`<h1 style="color:blue;"> Bienvenido al server</h1>`)
})

router.get('/productos/listar', (req, res) => {
    
    res.send(items.listar())
});
router.get('/productos/listar/:id', (req, res) => {
  
   res.send(items.listar(req.params.id))
});

router.post('/productos/guardar', (req, res) => {
   
    res.send(items.guardar(req.body))

});

router.get('/', (req, res) => {
   
    res.sendFile('index')

});


router.put('/productos/editar/:id', (req, res) => {
 
    res.send(items.editar(req.params.id,req.body))
 
 });
 
 router.delete('/productos/borrar/:id', (req, res) => {

    let eliminado=items.borrar(req.params.id)
   
    res.send(eliminado)

 });
 

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
 
