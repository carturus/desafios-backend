const {CustomError} = require('../errores/CustomError')
const {ProductosDao}= require('./ProductosDAO')
const options = require('../config');
const knex = require('knex')(options.MYSQL);

class ProductosDaoMysql extends ProductosDao {

    constructor(){
        super()
    }

    async guardar (item){   
        try{
            await knex('productos').insert(item)
            return item
        }catch (err) {
            throw new CustomError(500, 'error al guardar producto', err)
        }
    }

    async listar(){ 
        try{ 
        return await knex.from('productos').select('*')
        }catch (err) {
            throw new CustomError(500, 'error al listasr productos', err)
        }
    }

    async buscar(id){ 
        
        try{ 
        let resultado=await knex.from('productos').select('*').where('id', parseInt(id))       
        if (resultado.length<1)
        return `No se encontro producto ${id}`;
        else
        return resultado[0];

        }catch (error) {
            throw new CustomError(500, 'error al buscar producto', error)
        }
        
    }

    async actualizar(id,item){ 
        try{ 
        let resultado=await knex.from('productos').where('id',parseInt(id)).update({title:item.title,price:item.price,thumbnail:item.thumbnail})
       if (resultado==0)
        return `No se encontro producto ${id}`
        else
      return await knex.from('productos').select('*').where('id', parseInt(id));
        }catch (error) {
            throw new CustomError(500, `error actulizar producto`, error)
        }
    }

    async borrar(id){ 
        try{ 
        let resultado= await knex.from('productos').where('id', parseInt(id)).del()
        if (resultado==0)
        throw {error:`No se encontro producto ${id} para eliminar`};
        return {Estatus:`Se borro prducto con id ${id}`};
        }catch (error) {
            throw new CustomError(500, `error al borrar producto`, error)
        }
    }

}

module.exports = {ProductosDaoMysql}