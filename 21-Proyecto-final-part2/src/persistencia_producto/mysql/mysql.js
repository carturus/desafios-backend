const options = require('./config/database');
const knex = require('knex')(options.mysql);

//CRUD

class MySql{
    constructor(){}

    //Insert
    async insertarProducto (producto){  
    
        try{
            let item={timestamp_producto:Date.now(),...producto}
            let result=  await knex('productos').insert(item)
            return result
        }
        
        catch(error){
            return {"Error":error}
        }
    }
    //select
    async listarProductos(){ 
        try{ 
        return await knex.from('productos').select('*')
        }
        catch{
        console.log('error:');
        return []
    }
    }
    //Select por id
     async buscarProducto(id){ 
        try{ 
        return await knex.from('productos').select('*').where('id', parseInt(id))
        }
        catch(error){
            return {"Error":error}
        }
    }
    
    //Actualizar producto
    async actualizarProducto(id,datos){ 
        try{ 
            console.log(datos)
        return await knex.from('productos').where('id', parseInt(id)).update({ price: datos.price , title: datos.title , thumbnail: datos.thumbnail })
        }
        catch(error){
            return {"Error":error}
        }
    }
    
    //Borrar producto
    async eliminarProducto(id){ 
        try{ 
        return await knex.from('productos').where('id', parseInt(id)).del()
        }
        catch(error){
            return {"Error":error}
        }
    }
}


module.exports = MySql;