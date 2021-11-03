/* eslint-disable no-unused-vars */
const {CustomError} = require('../errores/CustomError')
class ItemsDao {

    
    async guardar () {
        throw new CustomError(500, 'falta implementar guardar!')
    }

    async listar() {
        throw new CustomError(500, 'falta implementar listar')
    }

    async buscar(){
        throw new CustomError(500, 'falta implementar buscar')
    }

    async actualizar() {
        throw new CustomError(500, 'falta implementar actualizar!')
    }

}

module.exports = {ItemsDao}