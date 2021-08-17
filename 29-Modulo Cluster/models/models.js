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
 
const User=mongoose.model('users',schemaUser)
const Mensaje = mongoose.model('mensajes', schemaMensaje);

module.exports = {Mensaje,User};