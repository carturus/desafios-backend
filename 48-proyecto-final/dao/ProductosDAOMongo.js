//mongo
const { Producto } = require("../models/models");
const { CustomError } = require("../errores/CustomError");
const { CustomResponse } = require("../respuestas/CustomResponse");
const { ItemsDao } = require("./DAO");

class ProductosDaoMongo extends ItemsDao {
  constructor() {
    super();
  }
  async guardar(item) {
    try {
      let producto = await Producto.create(item);
      return new CustomResponse(200, `Se agrego producto`, producto);
    } catch (err) {
      return new CustomError(500, "error no se pudo guardar producto", err);
    }
  }
  async listar() {
    try {
      let productos = await Producto.find({}).lean();
      return new CustomResponse(200, `Se encontro productos`, productos);
    } catch (err) {
      return new CustomError(500, "error no se pudieron listar productos", err);
    }
  }
  async buscar(id) {
    try {
      let producto = await Producto.findById(id);
      return producto
        ? new CustomResponse(200, `Se encontro producto ${id}`, producto)
        : new CustomError(500, "error no se encotro producto");
    } catch (error) {
      return new CustomError(500, "error no se encotro producto", error);
    }
  }
  async borrar(id) {
    try {
      await Producto.deleteOne({ _id: id });
      return new CustomResponse(200, `Se borro producto con id ${id}`);
    } catch (error) {
      return new CustomError(500, `error al borrar producto`, error);
    }
  }
  async actualizar(id, item) {
    try {
      await Producto.updateOne(
        { _id: id },
        {
          $set: {
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail,
          },
        }
      );
      return new CustomResponse(200, `Se actualizo producto con id ${id}`);
    } catch (error) {
      return new CustomError(500, `error al reemplazar al producto`, error);
    }
  }
}
module.exports = { ProductosDaoMongo };
