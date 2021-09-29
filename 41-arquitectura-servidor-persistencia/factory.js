
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
    }

}

module.exports = new PersistenciaFactory();