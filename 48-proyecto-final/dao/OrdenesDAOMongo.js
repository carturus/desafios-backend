//mongo
const { Orden } = require("../models/models");
const { CustomError } = require("../errores/CustomError");
const { CustomResponse } = require("../respuestas/CustomResponse");
const { ItemsDao } = require("./DAO");

class OrdenesDaoMongo extends ItemsDao {
  constructor() {
    super();
  }
  async guardar(item) {
    try {
      let orden = await Orden.create(item);
      return new CustomResponse(200, `Se genero orden`, orden);
    } catch (err) {
      return new CustomError(500, "No se pudo generar orden", err);
    }
  }
  async listar() {
    try {
      let ordenes= await Orden.find({}).lean();
      return new CustomResponse(200, `Se encontraron ordenes`, ordenes);
    } catch (err) {
      return new CustomError(500, "error no se pudieron listar ordenes", err);
    }
  }
  async buscar(id) {
    try {
      let orden = await Orden.findById(id).lean();
      return orden
        ? new CustomResponse(200, `Se encontro orden${id}`, orden)
        : new CustomError(500, "No se encontro orden");
    } catch (error) {
      return new CustomError(500, "No se encontro orden", error);
    }
  }
  async borrar(id) {
    try {
      await Orden.deleteOne({ _id: id });
      return new CustomResponse(200, `Se borro orden ${id}`);
    } catch (error) {
      return new CustomError(500, `No se pudo borrar orden`, error);
    }
  }
  async actualizar(id, estado) {
    try {
      await Orden.updateOne(
        { _id: id },
        {
          $set: {
            estado: estado,
          },
        }
      );
      return new CustomResponse(200, `Se actualizo orden ${id} a estado ${estado}`);
    } catch (error) {
      return new CustomError(500, `No se pudo actualizar orden`, error);
    }
  }
}
module.exports = { OrdenesDaoMongo };
