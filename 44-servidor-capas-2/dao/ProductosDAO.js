/* eslint-disable no-unused-vars */
const {CustomError} = require('../errores/CustomError')
class ProductosDao {

    
    async guardar (item) {
        throw new CustomError(500, 'falta implementar guardar!')
    }

    async listar() {
        throw new CustomError(500, 'falta implementar listar')
    }

    async buscar(id){
        throw new CustomError(500, 'falta implementar buscar')
    }

    async actualizar(id,item) {
        throw new CustomError(500, 'falta implementar actualizar!')
    }

}

module.exports = {ProductosDao}