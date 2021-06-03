const express = require('express');
const items = require('./api/productos');
let id=0
// creo una app de tipo express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// completar el codigo...


// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

app.get('/',(req,res)=>{

    res.send(`<h1 style="color:blue;"> Bienvenido al server</h1>`)
})

app.get('/api/productos/listar', (req, res) => {
    
    res.send(items.listar())
});
app.get('/api/productos/listar/:id', (req, res) => {
   // res.send(items.productos[req.params.id+1])
   res.send(items.listar(req.params.id))
});

app.post('/api/productos/guardar', (req, res) => {
   // items.productos.push(req.body)
   id++
   
    res.send(items.guardar(req.body,id))
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
 
