const mongoose = require('mongoose');
const producto = require('../models/producto');
const config = require('../config.json');

class AccesoMongo{
    constructor(){
        (async () => { 
            await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
         })()  

    }

    async insertarProducto (item){ 
        return await producto.create(item);
    }
    async listarProductos(){ 
        return await producto.find({});
    }
    async buscarProducto(id){ 
        return await producto.findById(id);
    }
    async actualizarProducto(id,datos){ 

        return await producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});

    }

    async eliminarProducto(id){ 
        return await producto.deleteOne({ _id: id});
    }
}

module.exports = new AccesoMongo();