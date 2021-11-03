//mongo
const { Carrito } = require("../models/models");
const {CustomError}=require("../errores/CustomError")
const {CustomResponse}= require("../respuestas/CustomResponse")
const { ItemsDao } = require("./DAO");

class CarritoDaoMongo extends ItemsDao {
  constructor() {
    super();
  }
  async guardar(carrito) {
    try {
      await Carrito.create(carrito);      
     return new CustomResponse(200, `Se agrego producto al carrito`, carrito);
    } catch (err) {
      return new CustomError(500, "error no se pudo guardar producto", err);
    }
  }
  async listar() {
    try {
      let carritos= await Carrito.find({}).lean();
      return new CustomResponse(200, `Se encontro carritos `, carritos)
    } catch (err) {
      return new CustomError(500, "error no se pudieron listar carritos", err);
    }
  }
  async buscar(mail) {
    try {
      let carrito = await Carrito.findOne({ mail: mail }).lean();
      return carrito
        ? new CustomResponse(200, `Se encontro carrito ${mail}`, carrito)
        : new CustomError(500, "error no se encotro carrito");
    } catch (error) {
      return new CustomError(500, "error no se encotro carrito", error);
    }
  }

  async borrar(mail) {
    try {
      await Carrito.deleteOne({ mail: mail });
      return new CustomResponse(200, `Se borro carrito mail ${mail}`);
    } catch (error) {
      return new CustomError(500, `Error al borrar carrito ${mail}`, error);
    }
  }
  async actualizar(mail, carrito) {
    try {
      await Carrito.updateOne(
        { mail: mail },
        {
          $set: {
            timestamp_carrito: carrito.timestamp_carrito,
            mail: carrito.mail,
            productos: carrito.productos,
          },
        }
      );
      return new CustomResponse(200, `Se actualizo carrito ${mail}`, carrito)
    } catch (error) {
      return new CustomError(500, `Error al reemplazar al carritp`, error);
    }
  }
}
module.exports = { CarritoDaoMongo };
