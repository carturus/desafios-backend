class PersistenciaFactory {
  constructor() {}

  getDAO(tipo, api) {
    if (tipo == "MONGO" || tipo == "ATLAS") {
      //Persistencia en Mongo
      const { ProductosDaoMongo } = require("./dao/ProductosDAOMongo");
      const { CarritoDaoMongo } = require("./dao/CarritoDAOMongo");
      const { OrdenesDaoMongo } = require("./dao/OrdenesDAOMongo");
      if(api=="ordenes")
       {
         return new OrdenesDaoMongo();
       }
      return api == "productos"
        ? new ProductosDaoMongo()
        : new CarritoDaoMongo();
    }

    if (tipo == "MEMORY") {
      //Persistencia en Memory
      const { ProductosDaoMemory } = require("./dao/ProductosDAOMemory");
      const { CarritoDaoMemory } = require("./dao/CarritoDAOMemory");
      return api == "productos"
        ? new ProductosDaoMemory()
        : new CarritoDaoMemory();
    }
  }
}

module.exports = new PersistenciaFactory();
