const fetch = require("node-fetch");
const factory= require('../factory');
const tipoPersistencia=require('../config/config.json')
//tipoPersistenica 0 = Mongo, 1=Mysql, 2=Nube
let instancia= factory.getPersistenciaCarrito(tipoPersistencia[2].Persistencia,tipoPersistencia[2].Url)

class Carrito {
    constructor() {}

    async listar() {
        return await instancia.listarCarrito();
    }
    
    async buscarPorId(id) {
        return await instancia.buscarCarrito(id) || { error: `producto con id ${id} no encontrado`};
    }

    async agregarPorId(id) {
        //utilizamos fecth para buscar productos en la url de API productos
        let response = await fetch(`http://localhost:8080/productos/listar/${id}`);
        console.log(`http://localhost:8080/productos/listar/${id}`)
        let data= await response.json()
        let producto= {timestamp_carrito:Date.now(), producto: data}
        console.log(data.Error)
        if(data.Error==undefined){
            return await instancia.insertarCarrito(producto)         
        }else{
        if(data.Error=="No se encontro producto"){
            return { error: `producto con id ${id} no encontrado, no se puede agregar`}         
        }

        }
        //Si se encontro producto se llama insertarProducto, en caso contrario se envía advertencia
        //return (data.Error=!"No se encontro producto")|| (data.Error=!undefined )? await instancia.insertarCarrito(producto): { error: `producto con id ${id} no encontrado, no se puede agregar`}
    }
    async borrar(id) {
        return await instancia.eliminarCarrito(id);
    }
}

module.exports = new Carrito();