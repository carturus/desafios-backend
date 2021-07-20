const factory= require('../factory');
const tipoPersistencia=require('../config/config.json')
//tipoPersistenica 0 = Mongo, 1=Mysql, 2=Nube
let Persistencia= factory.getPersistenciaProducto(tipoPersistencia[2].Persistencia)
let instancia =new Persistencia();

class Productos {

    constructor() {}

    async listar() {
        
        return await instancia.listarProductos();
    }

    async buscarPorId(id) {
        return await instancia.buscarProducto(id) || { error: `producto con id ${id} no encontrado`};
    }

    async guardar(item) {
        return await instancia.insertarProducto(item);

    }

    async actualizar(id, item) {
        return await instancia.actualizarProducto(id,item);

    }

    async borrar(id) {
        return await instancia.eliminarProducto(id);
    }
}

module.exports = new Productos();