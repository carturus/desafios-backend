//mongo
const {Producto} = require('../models/models');

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

module.exports = {ClassMongo}