
const factory=require('../factory')
const config = require('../config');
let dao= factory.getDAOProducto(config.PERSISTENCIA)


const {Producto} = require('../models/models');

class Productos {
    constructor() {       
    }


   async listar() {
    return await dao.listar();
    }

   async vista() {
    return await Producto.find({}).lean();;
    }

    async buscarPorId(id) {
    //return await Producto.findById(id);
    return await dao.buscar(id);
    }

    async guardar(producto) {
    //return await Producto.create(item);
    return await dao.guardar(producto);
    }

    async actualizar(id, producto) {
    //return await Producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
    return await dao.actualizar(id, producto);
    }

    async borrar(id) {
    //return await Producto.deleteOne({ _id: id});
    return await dao.borrar(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();