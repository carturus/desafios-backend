//mongo
const mongoose = require('mongoose');
const {producto} = require('../models/models');
//Mysql
const options = require('../config/database');
const { convertCompilerOptionsFromJson } = require('typescript');
const knex = require('knex')(options.mysql);

const ClassMongo = class Mongo{
    constructor(){
    }

    async insertarProducto (datos){ 
        try{
        let item={timestamp_producto:Date.now(),...datos}
        return await producto.create(item);
        }
        catch(error){
            return {Error:"No se pudo intertar producto", Description: error}
        }
    }
    async listarProductos(){ 
        try{
        return await producto.find({}).lean();
        //return await producto.find({});
        }
        catch(error){
            return {Error:"No se pudieron consultar prouctos", Description: error}
        }
    }
    async buscarProducto(id){ 
        try{
        return await producto.findById(id)
        }
        catch(error){
            return {Error:"No se encontro producto", Description: error}
        }
    }
    async actualizarProducto(id,item){ 
        try{       
        return await producto.findOneAndUpdate({_id: id},{nombre: item.nombre, precio:item.precio, foto:item.foto, stock:item.stock}, {new:true});
        }
        catch(error){
            return {Error:"No se actualizo producto", Description: error}
    }
    }
    async eliminarProducto(id){ 
        try{
        return await producto.deleteOne({ _id: id});
        }
        catch(error){
            return {Error:"No se borro producto", Description: error}
        }
    }
}

const ClassMySQL =class MySql{
    constructor(){}
    //Insert
    async insertarProducto (producto){  
    
        try{
            let item={timestamp_producto:Date.now(),...producto}
            await knex('productos').insert(item)
            return item
        }
        catch(error){
            return {Error:"No se pudo intertar producto", Description: error}
        }
    }
    //select
    async listarProductos(){ 
        try{ 
        return await knex.from('productos').select('*')
        }
        catch(error){
            return {Error:"No se pudieron consultar prouctos", Description: error}
        }
    }
    //Select por id
     async buscarProducto(id){ 
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
    async actualizarProducto(id,item){ 
        try{ 
        let resultado= await knex.from('productos').update({ precio: item.precio , nombre: item.nombre , foto: item.foto }).where('id',parseInt(id))
        console.log(resultado) 
        if (resultado==0)
        throw {Error:`No se encontro producto ${id}`};
      return await knex.from('productos').select('*').where('id', parseInt(id));
        }
        catch(error){
         return {Error:"No se actualizo producto", Description: error}
    }
    }   
    //Borrar producto
    async eliminarProducto(id){ 
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
module.exports = {ClassMongo, ClassMySQL}