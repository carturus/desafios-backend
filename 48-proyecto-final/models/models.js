const mongoose = require('mongoose');

const schemaUser= mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    mail: { type: String, required: true, max: 100 },
    direccion: { type: String, required: true, max: 100 },
});

const schemaProducto = mongoose.Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    thumbnail: { type: String, required: true, max: 100 },
});

const schemaCarrito = mongoose.Schema({
    timestamp_carrito:{ type: String, max: 100 },
    mail:{ type: String, max: 100 },
    productos: [{_id: { type: String, required: true, max: 100 },title: { type: String, required: true },
    price: { type: Number, required: true},
    thumbnail: { type: String, required: true, max: 100 },__v: { type: Number}}],
});

const schemaOrden = mongoose.Schema({
    timestamp_orden:{ type: String, max: 100 },
    carrito_id:{ type: String, max: 100 },
    mail:{ type: String, max: 100 },
    estado:{ type: String, max: 100 },
    productos: [{_id: { type: String, required: true, max: 100 },title: { type: String, required: true },
        price: { type: Number, required: true},
        thumbnail: { type: String, required: true, max: 100 },__v: { type: Number}}]
   
});


const Producto = mongoose.model('productos', schemaProducto)
const User=mongoose.model('users',schemaUser)
const Carrito = mongoose.model('carrito',schemaCarrito)
const Orden = mongoose.model('ordenes',schemaOrden)

module.exports = {User,Producto,Carrito,Orden};