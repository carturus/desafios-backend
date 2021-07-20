
const Persistencia=require('../knex/accesoMysql')


class Productos {
    constructor() {     
    }


   async listar() {
        return await Persistencia.listarProductos();
    }

    async buscarPorId(id) {
        return await Persistencia.buscarProducto(id);
    }

    async guardar(item) {
        return await Persistencia.insertarProducto(item);
    }

    async actualizar(id, item) {
        return await Persistencia.actualizarProducto(id,item);
    }

    async borrar(id) {
        return await Persistencia.eliminarProducto(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();