const mongoose = require('mongoose');
const {Producto} = require('../models/models');
const config = require('../config.json');


class Productos {
    constructor() {       
    }


   async listar() {
    return await Producto.find({});;
    }

   async vista() {
    return await Producto.find({}).lean();;
    }

    async buscarPorId(id) {
        return await Producto.findById(id);
    }

    async guardar(item) {
        return await Producto.create(item);
    }

    async actualizar(id, item) {
       // return await actualizarProducto(id,datos);
       return await Producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
    }

    async borrar(id) {
        return await Producto.deleteOne({ _id: id});
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();