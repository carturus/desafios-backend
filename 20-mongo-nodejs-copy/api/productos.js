const persistencia= require('../persistencia/accesoMongo');

class Productos {
    constructor() {          
    }
   async listar() {
    return await persistencia.listarProductos();
    }
    async buscarPorId(id) {
        return await persistencia.buscarProducto(id);
    }
    async guardar(item) {
        return await persistencia.insertarProducto(item);
    }

    async actualizar(id, item) {
        return await persistencia.actualizarProducto(id,item);
    }

    async borrar(id) {
        return await persistencia.eliminarProducto(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();