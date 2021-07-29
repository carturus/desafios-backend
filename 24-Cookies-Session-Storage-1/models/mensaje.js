const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: {
        mail:{ type: String, require: true, max: 100 },
        username: { type: String, require: true, max: 100 },
        name: { type: String, require: true, max: 100 },
        age: { type: Number, require: true },
    },
    date: { type: Date, require: true },
    text: { type: String, require: true, max: 100 },
});


const Mensaje = mongoose.model('mensajes', schema);

module.exports = Mensaje;