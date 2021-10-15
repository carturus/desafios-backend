const mongoose = require('mongoose');
const producto = require('../models/producto');
const config = require('../config.json');


class Productos {
    constructor() {
      
        (async () => { 

            await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
 
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

    async actualizar(id, item) {
       // return await actualizarProducto(id,datos);
       return await producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
    }

    async borrar(id) {
        return await producto.deleteOne({ _id: id});
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();