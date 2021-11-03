const factory = require("../factory");
const config = require("../config");
let dao = factory.getDAO(config.PERSISTENCIA, "carrito");
const productos = require("./productos");
class Carrito {
  constructor() {}

  async listar() {
    return await dao.listar();
  }

  async buscar(mail) {
    return await dao.buscar(mail);
  }

  async guardar(mail,idProducto,cantidad) {
    let productoRespuesta = await productos.buscar(idProducto);
    if (productoRespuesta.estado == 200) {
      let carritoRespuesta = await dao.buscar(mail);
  
      if ((carritoRespuesta.estado ==200)) {

        let newCarrito = carritoRespuesta.detalles;
        
        newCarrito.productos.push(productoRespuesta.detalles);
      
        return await dao.actualizar(mail, newCarrito);
      } else {
        //Agrega Carro
        let newCarrito = {
          timestamp_carrito:Date.now(),
          mail: mail,
          productos: [productoRespuesta.detalles],
        };
       
        //return newCarrito;
       return await dao.guardar(newCarrito);
      }
    } else {
      return productoRespuesta;
    }
  }

  async actualizar(mail, carrito) {
    const   existeCarrito= await dao.buscar(mail);
    if( existeCarrito.estado==500 )return existeCarrito
    return await dao.actualizar(mail, carrito);
  }

  async borrar(mail) {
    const   existeCarrito= await dao.buscar(mail);
    if( existeCarrito.estado==500 )return existeCarrito
    return await dao.borrar(mail);
  }
}

// exporto una instancia de la clase
module.exports = new Carrito();
