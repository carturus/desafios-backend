const { actualizar } = require('../api/productos');
const options = require('../config/database');
const knex = require('knex')(options.mysql);

//CRUD

//Create
const crearTabla= async ()=>{ 
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
const insertarProducto= async (producto)=>{  
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
const listarProductos= async ()=> { 
    try{ 
    return JSON.parse(JSON.stringify(await knex.from('productos').select('*')))
    }
    catch{
    console.log('error:');
    return []
}
}
//Select por id
const buscarProducto= async (id)=> { 
    try{ 
    return JSON.parse(JSON.stringify(await knex.from('productos').select('*').where('id', parseInt(id))))
    }
    catch{
    console.log('error:');
    return []
}
}

//Actualizar producto
const actualizarProducto= async (id,datos)=> { 
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
const eliminarProducto= async (id)=> { 
    try{ 
    return JSON.parse(JSON.stringify(await knex.from('productos').where('id', parseInt(id)).del()))
    }
    catch{
    console.log('error:');
    return []
}
}

exports.crearTabla = crearTabla;
exports.insertarProducto = insertarProducto;
exports.listarProductos = listarProductos;
exports.buscarProducto= buscarProducto;
exports.actualizarProducto=actualizarProducto;
exports.eliminarProducto=eliminarProducto;