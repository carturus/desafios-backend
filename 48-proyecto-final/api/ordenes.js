const factory=require('../factory')
const config = require('../config');
const carrito = require("./carrito")
let dao= factory.getDAO(config.PERSISTENCIA,'ordenes')


class Ordenes {
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

    async guardar(mail,estado) {
        let carritoRespuesta = await carrito.buscar(mail);
        if (carritoRespuesta.estado == 200){
           let productos=carritoRespuesta.detalles.productos
           let carrito_id=carritoRespuesta.detalles._id
           let mail=carritoRespuesta.detalles.mail
            let orden={
                timestamp_orden:Date.now(),
                mail:mail,
                carrito_id:carrito_id,
                productos:productos,
                estado:estado,
            }
            return await dao.guardar(orden);
        }
        else {
            return carritoRespuesta;
          }

    
    }

    async actualizar(id, estado) {
     const   existeOrden= await dao.buscar(id);
    if( existeOrden.estado==500 )return existeOrden
    return await dao.actualizar(id, estado);
    }

    async borrar(id) {
        const   existeOrden= await dao.buscar(id);
        if( existeOrden.estado==500 )return existeOrden
    return await dao.borrar(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Ordenes();