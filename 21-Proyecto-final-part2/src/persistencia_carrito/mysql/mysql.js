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
        
    catch{
      
        console.log('error:')
        return []
    }
    }
    //select
    async listarProductos(){ 
        try{ 
        return await knex.from('carrito').select('*')
        }
        catch{
        console.log('error:');
        return []
    }
    }
    //Select por id
     async buscarProducto(id){ 
        try{ 
        return await knex.from('carrito').select('*').where('id', parseInt(id))
        }
        catch{
        console.log('error:');
        return []
    }
    }
    
    //Actualizar producto
    async actualizarProducto(id,datos){ 
        try{ 
            console.log(datos)
        return  await knex.from('carrito').where('id', parseInt(id)).update({ price: datos.price , title: datos.title , thumbnail: datos.thumbnail })
        }
        catch{
        console.log('error:');
        return []
    }
    }
    
    //Borrar producto
    async eliminarProducto(id){ 
        try{ 
        return await knex.from('carrito').where('id', parseInt(id)).del()
        }
        catch{
        console.log('error:');
        return []
    }
    }
}


module.exports = MySql;