const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp_producto:{ type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const Producto = mongoose.model('productos', schema);

module.exports = Producto;