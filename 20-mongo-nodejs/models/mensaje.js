const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: { type: String, require: true, max: 100 },
    date: { type: Date, require: true },
    text: { type: String, require: true, max: 100 },
});

const Mensaje = mongoose.model('mensajes', schema);

module.exports = Mensaje;