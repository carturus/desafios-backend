//Mongo
const mongoose = require('mongoose');
const {carrito} = require('../models/models');
//const config = require('./config/config.json');
//Mysql
const options = require('../config/database');
const knex = require('knex')(options.mysql);


const ClassMongo = class Mongo{
    constructor(){
 
    }
    async insertarCarrito (item){ 
        try{
            return await carrito.create(item);
        }
        catch(error){
            return {Error:"No se pudo agregar item al carrito", Description: error}
        }
    }
    async listarCarrito(){ 
        try{
             return await carrito.find({}).lean();
            }
            catch(error){
                return {Error:"No se puden listar items del carrito", Description: error}
            } 
    }
    async buscarCarrito(id){ 
        try{
        return await carrito.findById(id).lean();
        }
        catch(error){
            return {Error:"No se encontro item del carrito", Description: error}
        }
    }

    async eliminarCarrito(id){ 
        try{
        return await carrito.deleteOne({ _id: id});
        }
        catch(error){
            return {Error:"No se pudo eliminar item del carrito", Description: error}
        }
    }

    async vaciarCarrito(){ 
        try{
        return await carrito.deleteMany();
        }
        catch(error){
            return {Error:"No se pudo eliminar item del carrito", Description: error}
        }
    }
}

const ClassMySQL =class MySql{
    constructor(){}

    //Insert
    async insertarCarrito (item){  
        try{
            let carrito = {timestamp_carrito: item.timestamp_carrito, producto: JSON.stringify(item.producto)}
            return await knex('carrito').insert(producto)         
        }       
        catch(error){
            return {Error:"No se pudo agregar item al carrito", Description: error}
        }
    }
    //select
    async listarCarrito(){ 
        try{ 
        return await knex.from('carrito').select('*')
        }
        catch(error){
            return {Error:"No se puden listar items del carrito", Description: error}
        } 
    }
    //Select por id
     async buscarCarrito(id){ 
        try{ 
        let resultado= await knex.from('carrito').select('*').where('id', parseInt(id))
        if (resultado.length<1)
        throw {Error:`No se encontro producto ${id}`};
        return resultado;    
    }
        catch(error){
            return {Error:"No se encontro item del carrito", Description: error}
        }
    }
    
    //Borrar producto
    async eliminarCarrito(id){ 
        try{ 
       let resultado=await knex.from('carrito').where('id', parseInt(id)).del()
        if (resultado==0)
        throw {Error:`No se encontro item ${id} para eliminar`};
        return {Estatus:`Se borro item con id ${id}`};
        }
        catch(error){
            return {Error:"No se pudo eliminar item del carrito", Description: error}
        }
    }
}

module.exports = {ClassMongo, ClassMySQL}