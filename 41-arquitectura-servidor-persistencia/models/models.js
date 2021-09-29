const mongoose = require('mongoose');

const schemaMensaje = mongoose.Schema({
    author: {
        mail:{ type: String, require: true, max: 100 },
        username: { type: String, require: true, max: 100 },
        name: { type: String, require: true, max: 100 },
        age: { type: Number, require: true },
    },
    date: { type: Date, require: true },
    text: { type: String, require: true, max: 100 },
});

const schemaUser= mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
});

const schemaProducto = mongoose.Schema({
    title: { type: String, require: true, max: 100 },
    price: { type: Number, require: true },
    thumbnail: { type: String, require: true, max: 100 },
});

const Producto = mongoose.model('productos', schemaProducto);
const User=mongoose.model('users',schemaUser)
const Mensaje = mongoose.model('mensajes', schemaMensaje);

module.exports = {Mensaje,User,Producto};