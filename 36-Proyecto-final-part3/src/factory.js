
class PersistenciaFactory {

    constructor() {}

    getPersistenciaProducto(tipo,url) {
        //console.log(`./persistencia_producto/${tipo}/${tipo}`)
        if(tipo=='mongo'){
           const {ClassMongo}=require('./persistencia_producto/persistenciaProducto')
           return new ClassMongo(url); 
        }
        if(tipo=='nube'){
           const {ClassMongo}=require('./persistencia_producto/persistenciaProducto')
           return new ClassMongo(url); 
        }
        if(tipo=='mysql'){
            const {ClassMySQL} =require('./persistencia_producto/persistenciaProducto')
            return new ClassMySQL; 
         }
    }
    getPersistenciaCarrito(tipo,url) {
        if(tipo=='mongo'){
           console.log(tipo)
            const {ClassMongo}=require('./persistencia_carrito/persistenciaCarrito')
            return new ClassMongo(url); 
         }
         if(tipo=='nube'){
            const {ClassMongo}=require('./persistencia_carrito/persistenciaCarrito')
            return new ClassMongo(url); 
         }
         if(tipo=='mysql'){
             const {ClassMySQL} =require('./persistencia_carrito/persistenciaCarrito')
             return new ClassMySQL; 
          }
     }

    //    console.log(`./persistencia_carrito/${tipo}/${tipo}`)
    //     try {
            
    //         let modulo = require(`./persistencia_carrito/${tipo}/${tipo}`);
    //         return modulo
    //     } catch (error) {
    //         console.log('No se encontro el tipo de persistencia:');
    //     }
    // }


}

module.exports = new PersistenciaFactory();