const fetch = require("node-fetch");
const factory= require('../factory');
const tipoPersistencia=require('../config/config.json')
//tipoPersistenica 0 = Mongo, 1=Mysql, 2=Nube
let Persistencia= factory.getPersistenciaCarrito(tipoPersistencia[2].Persistencia)
let instancia =new Persistencia();


class Carrito {
    constructor() {}

    async listar() {
        return await instancia.listarProductos();
    }

    async agregarPorId(id) {
        //utilizamos fecth para buscar productos en la url de API productos
        let response = await fetch(`http://localhost:8080/productos/listar/${id}`);
        console.log(`http://localhost:8080/productos/listar/${id}`)
        let data= await response.json()
        console.log("soy el data",data)
        let producto= {timestamp_carrito:Date.now(), producto: data}
        //Si se encontro producto se llama insertarProducto, en caso contrario se envía advertencia
        return data? await instancia.insertarProducto(producto): { error: `producto con id ${id} no encontrado en productos`}
    }


    async borrar(id) {
        return await instancia.eliminarProducto(id);
    }
}

module.exports = new Carrito();