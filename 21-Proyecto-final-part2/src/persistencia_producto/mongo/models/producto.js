const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp_producto:{ type: String, require: true, max: 100 },
    nombre: { type: String, require: true, max: 100 },
    descripcion: { type: String, require: true, max: 100 },
    foto: { type: String, require: true, max: 100 },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
});

const Producto = mongoose.model('productos', schema);

module.exports = Producto;