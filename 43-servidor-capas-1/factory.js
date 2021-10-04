
class PersistenciaFactory {

    constructor() {}

    getDAOProducto(tipo) {
        if(tipo=='MONGO'||tipo=='ATLAS'){
           const {ProductosDaoMongo}=require('./dao/ProductosDAOMongo')
           return new ProductosDaoMongo(); 
        }

        if(tipo=='MYSQL'){
            const {ProductosDaoMysql} =require('./dao/ProductosDAOMysql')
            return new ProductosDaoMysql(); 
         }

         if(tipo=='MEMORY'){
            const {ProductosDaoMemory} =require('./dao/ProductosDAOMemory')
            return new ProductosDaoMemory(); 
         }
    }

}

module.exports = new PersistenciaFactory();