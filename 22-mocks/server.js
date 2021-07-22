const express = require('express');
const app = express();
const routerVista = express.Router();
const handlebars = require("express-handlebars")
const faker = require('faker');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

 
// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
 
