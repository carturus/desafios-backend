const mongoose = require('mongoose');

const schemaUser= mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    correo: { type: String, required: true, max: 100 },
    direccion: { type: String, required: true, max: 100 },
    edad: { type: Number, required: true, max: 1000 },
    telefono: { type: Number,required: true, max: 100 },

});
const User=mongoose.model('users',schemaUser)

module.exports = {User};