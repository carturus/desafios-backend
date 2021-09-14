const mongoose = require('mongoose');

const schemaUser= mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    correo: { type: String, required: true, max: 100 },
    direccion: { type: String, required: true, max: 100 },
    edad: { type: Number, required: true, max: 1000 },
    telefono: { type: String,required: true, max: 100 },

});
const schemaCarrito = mongoose.Schema({
    timestamp_carrito:{ type: String, required: true, max: 100 },
    producto:  {
        timestamp_producto:{ type: String, require: true, max: 100 },
        nombre: { type: String, require: true, max: 100 },
        descripcion: { type: String, require: true, max: 100 },
        foto: { type: String, require: true, max: 100 },
        precio: { type: Number, require: true },
        stock: { type: Number, require: true },
    },
   // producto: { type: String, required: true, max: 100 },
});
const schemaProducto = mongoose.Schema({
    timestamp_producto:{ type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const producto = mongoose.model('productos', schemaProducto);


const carrito = mongoose.model('carrito', schemaCarrito);

const User=mongoose.model('users',schemaUser)

module.exports = {User,producto,carrito};