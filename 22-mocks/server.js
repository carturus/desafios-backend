const express = require('express');
const app = express();
const router = express.Router();
const routerVista = express.Router();
const items = require('./api/productos');
const handlebars = require("express-handlebars")
const faker = require('faker');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/productos',routerVista)
app.use('/static', express.static(__dirname + '/public'));

//establecemos la conf de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir:__dirname+'/views/layouts',
        partialsDir:__dirname+'/views/partials/'
    })
)

app.set('view engine','hbs');

app.set('views','./views')

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

//Rutas Plantillas

routerVista.get('/guardar',(req,res)=>{ 
    res.render('guardar')
})
routerVista.get('/vista',(req,res)=>{
   
     res.render('vista',{productos:items.listar(), hayProductos: items.listar().error== undefined})
 })
 routerVista.get('/vista-test', (req, res) => {
    let cant=req.query.cant||10
    let prods = []
    for(let i=1; i<=cant ; i++){
        prods.push({
            id:i,
            title:faker.commerce.product, 
            price:faker.commerce.price,
            thumbnail:faker.image.imageUrl,
        })

    }
    res.render('vista', { productos: prods, hayProductos: prods.length });
});



//Rutas API

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
   items.guardar(req.body)
    res.redirect('/productos/guardar')

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
 
