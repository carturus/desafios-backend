const mongoose = require('mongoose');
const producto = require('./models/carrito');
const config = require('./config.json');

class Nube{
    constructor(){
        (async () => { 
            await mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
         })()  

    }

    async insertarProducto (item){ 
        try{
            return await producto.create(item);
        }
        catch(error){
            return {"Error":error}
        }
    }
    async listarProductos(){ 
        try{
             return await producto.find({});
            }
        catch(error){
                return {"Error":error}
            }   
    }
    async buscarProducto(id){ 
        try{
        return await producto.findById(id);
        }
        catch(error){
            return {"Error":error}
        }
    }
    async actualizarProducto(id,datos){ 
        try{
        return await producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
        }
        catch(error){
            return {"Error":error}
        }
    }

    async eliminarProducto(id){ 
        try{
        return await producto.deleteOne({ _id: id});
        }
        catch(error){
            return {"Error":error}
        }
    }
}

module.exports = Nube;