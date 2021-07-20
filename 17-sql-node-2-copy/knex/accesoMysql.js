const options = require('../config/database');
const knex = require('knex')(options.mysql);

//CRUD

class AccesoMysql{
    constructor(){
    }

    async crearTabla(){ 
        try{  await knex.schema.createTable('productos', table => {
            table.increments('id');
            table.string('title');
            table.string('thumbnail');
            table.integer('price');
        })}
      catch{
        return 'Ya existe tabla'
    }
    }
    //Insert
    async insertarProducto (producto){  
        try{
            let result=  await knex('productos').insert(producto)
            return JSON.parse(JSON.stringify(result))
        }
        
    catch{
      
        console.log('error:')
        return []
    }
    }
    //select
    async listarProductos(){ 
        try{ 
        return JSON.parse(JSON.stringify(await knex.from('productos').select('*')))
        }
        catch{
        console.log('error:');
        return []
    }
    }
    //Select por id
     async buscarProducto(id){ 
        try{ 
        return JSON.parse(JSON.stringify(await knex.from('productos').select('*').where('id', parseInt(id))))
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
        return JSON.parse(JSON.stringify( await knex.from('productos').where('id', parseInt(id)).update({ price: datos.price , title: datos.title , thumbnail: datos.thumbnail })))
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
        return JSON.parse(JSON.stringify(await knex.from('productos').where('id', parseInt(id)).del()))
        }
        catch{
        console.log('error:');
        return []
    }
    }
}


module.exports = new AccesoMysql();