//mongo
const {Producto} = require('../models/models');
//Mysql
const options = require('../config/database');
const knex = require('knex')(options.mysql);

const ClassMongo = class Mongo{
    constructor(){
    }

    async guardar (item){ 
        try{
     
        return await Producto.create(item);
        }
        catch(error){
            return {Error:"No se pudo intertar producto", Description: error}
        }
    }
    async listar(){ 
        try{
            console.log(Producto)
            console.log("lo intente")
        return await Producto.find({});
        }
        catch(error){
            return {Error:"No se pudieron consultar prouctos", Description: error}
        }
    }
    async buscar(id){ 
        try{
        return await Producto.findById(id)
        }
        catch(error){
            return {Error:"No se encontro producto", Description: error}
        }
    }
    async actualizar(id,item){ 
        try{      
            return await Producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
        }
        catch(error){
            return {Error:"No se actualizo producto", Description: error}
    }
    }
    async borrar(id){ 
        try{
        return await Producto.deleteOne({ _id: id});
        }
        catch(error){
            return {Error:"No se borro producto", Description: error}
        }
    }
}

const ClassMySQL =class MySql{
    constructor(){}
    //Insert
    async guardar (item){  
    
        try{
            await knex('productos').insert(item)
            return item
        }
        catch(error){
            return {Error:"No se pudo intertar producto", Description: error}
        }
    }
    //select
    async listar(){ 
        try{ 
        return await knex.from('productos').select('*')
        }
        catch(error){
            return {Error:"No se pudieron consultar prouctos", Description: error}
        }
    }
    //Select por id
     async buscar(id){ 
        try{ 
        let resultado=await knex.from('productos').select('*').where('id', parseInt(id))
        if (resultado.length<1)
        throw {Error:`No se encontro producto ${id}`};
        return resultado;
        }
        catch(error){
        return {Error:"No se encontro producto", Description: error}
        }
    }
    
    //Actualizar producto
    async actualizar(id,item){ 
        try{ 
        let resultado= await knex.from('productos').update({ tile: item.tiltle , price: item.price , thumbnail: item.thumbnail }).where('id',parseInt(id))
        if (resultado==0)
        throw {Error:`No se encontro producto ${id}`};
      return await knex.from('productos').select('*').where('id', parseInt(id));
        }
        catch(error){
         return {Error:"No se actualizo producto", Description: error}
    }
    }   
    //Borrar producto
    async borrar(id){ 
        try{ 
        let resultado= await knex.from('productos').where('id', parseInt(id)).del()
        if (resultado==0)
        throw {Error:`No se encontro producto ${id} para eliminar`};
        return {Estatus:`Se borro prducto con id ${id}`};
        }
        catch(error){
            return {Error:"No se borro producto", Description: error}
        }
    }
}
module.exports = {ClassMongo,ClassMySQL}