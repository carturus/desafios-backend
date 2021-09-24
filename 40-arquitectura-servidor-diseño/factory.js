
class PersistenciaFactory {

    constructor() {}

    getPersistenciaProducto(tipo) {
        if(tipo=='MONGO'||tipo=='ATLAS'){
           const {ClassMongo}=require('./persistencia/persistenciaProducto')
           return new ClassMongo(); 
        }

        if(tipo=='MYSQL'){
            const {ClassMySQL} =require('./persistencia/persistenciaProducto')
            return new ClassMySQL; 
         }
    }

}

module.exports = new PersistenciaFactory();