
const factory=require('../factory')
const config = require('../config');
let dao= factory.getDAO(config.PERSISTENCIA,'productos')


class Productos {
    constructor() {       
    }


   async listar() {
    //return await Producto.find({});
    return await dao.listar();
    }

   async vista() {
    return await Producto.find({}).lean();;
    }

    async buscar(id) {
    //return await Producto.findById(id);
    return await dao.buscar(id);
    }

    async guardar(producto) {
    //return await Producto.create(item);
    return await dao.guardar(producto);
    }

    async actualizar(id, producto) {
    const   existeProducto= await dao.buscar(id);
    if( existeProducto.estado==500 )return existeProducto    
    return await dao.actualizar(id, producto);
    }

    async borrar(id) {
    const   existeProducto= await dao.buscar(id);
    if( existeProducto.estado==500 )return existeProducto
    return await dao.borrar(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();