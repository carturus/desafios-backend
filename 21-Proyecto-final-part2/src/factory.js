
class PersistenciaFactory {

    constructor() {}

    getPersistenciaProducto(tipo) {
        console.log(`./persistencia_producto/${tipo}/${tipo}`)
        try {
            
            let modulo = require(`./persistencia_producto/${tipo}/${tipo}`);
            return modulo
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:');
        }
    }
    getPersistenciaCarrito(tipo) {
        console.log(`./persistencia_carrito/${tipo}/${tipo}`)
        try {
            
            let modulo = require(`./persistencia_carrito/${tipo}/${tipo}`);
            return modulo
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:');
        }
    }


}

module.exports = new PersistenciaFactory();