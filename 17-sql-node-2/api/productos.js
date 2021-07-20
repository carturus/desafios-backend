const {listarProductos}= require('../knex/accesoMysql');
const {insertarProducto}= require('../knex/accesoMysql');
const {buscarProducto}= require('../knex/accesoMysql');
const {actualizarProducto}= require('../knex/accesoMysql');
const {eliminarProducto}= require('../knex/accesoMysql');
const {crearTabla}= require('../knex/accesoMysql');

class Productos {
    constructor() {
        //CrearTabla();
        (async () => { 
             await crearTabla();       
          })()         
    }


   async listar() {
        return await listarProductos();
    }

    async buscarPorId(id) {
        return await  buscarProducto(id);
    }

    async guardar(item) {
        return await insertarProducto(item);
    }

    async actualizar(id, item) {
        return await actualizarProducto(id,item);
    }

    async borrar(id) {
        return await eliminarProducto(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();