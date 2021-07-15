const mongoose = require('mongoose');
const producto = require('../models/producto');
const config = require('../config.json');


class Productos {
    constructor() {
      
        (async () => { 
            let result;
            await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
            result= await producto.find({});
            this.productos=result; 
          })()         
    }


   async listar() {
    return await producto.find({});;
    }

    async buscarPorId(id) {
        return await producto.findById(id);
    }

    async guardar(item) {
        return await producto.create(item);
    }

    async actualizar(id, datos) {
       // return await actualizarProducto(id,datos);
       return await producto.updateOne({_id: id}, { $set: {title: datos.title, price:datos.price, thumbnail:datos.thumbnail}});
    }

    async borrar(id) {
        return await producto.deleteOne({ _id: id});
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();