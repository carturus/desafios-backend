const mongoose = require('mongoose');

const schema = mongoose.Schema({
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

const Carrito = mongoose.model('carrito', schema);

module.exports = Carrito;