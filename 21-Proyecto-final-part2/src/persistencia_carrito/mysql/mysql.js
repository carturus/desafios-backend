const options = require('./config/database');
const knex = require('knex')(options.mysql);

//CRUD

class MySql{
    constructor(){}

    //Insert
    async insertarProducto (producto){  
        try{
            let item = {timestamp_carrito: producto.timestamp_carrito, producto: JSON.stringify(producto.producto)}
            return await knex('carrito').insert(item)
            
        }
        
    catch(error){
        return {"Error":error}
    }
    }
    //select
    async listarProductos(){ 
        try{ 
        return await knex.from('carrito').select('*')
        }
        catch(error){
            return {"Error":error}
        }
    }
    //Select por id
     async buscarProducto(id){ 
        try{ 
        return await knex.from('carrito').select('*').where('id', parseInt(id))
        }
        catch(error){
            return {"Error":error}
        }
    }
    
    //Actualizar producto
    async actualizarProducto(id,datos){ 
        try{ 
            console.log(datos)
        return  await knex.from('carrito').where('id', parseInt(id)).update({ price: datos.price , title: datos.title , thumbnail: datos.thumbnail })
        }
        catch(error){
            return {"Error":error}
        }
    }
    
    //Borrar producto
    async eliminarProducto(id){ 
        try{ 
        return await knex.from('carrito').where('id', parseInt(id)).del()
        }
        catch(error){
            return {"Error":error}
        }
    }
}


module.exports = MySql;