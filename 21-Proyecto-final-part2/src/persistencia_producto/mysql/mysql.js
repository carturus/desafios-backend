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
        
    catch{
      
        console.log('error de la base:')
        return []
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
        catch{
        console.log('error:');
        return []
    }
    }
    
    //Actualizar producto
    async actualizarProducto(id,datos){ 
        try{ 
            console.log(datos)
        return await knex.from('productos').where('id', parseInt(id)).update({ price: datos.price , title: datos.title , thumbnail: datos.thumbnail })
        //return JSON.parse(JSON.stringify( await knex.from('productos').where('id', parseInt(id)).update({ price: datos.price } ,{ title: datos.title },{ thumbnail: datos.thumbnail })))
        }
        catch{
        console.log('error:');
        return []
    }
    }
    
    //Borrar producto
    async eliminarProducto(id){ 
        try{ 
        return await knex.from('productos').where('id', parseInt(id)).del()
        }
        catch{
        console.log('error:');
        return []
    }
    }
}


module.exports = MySql;