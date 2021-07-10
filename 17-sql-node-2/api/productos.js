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
            let result;
            result= await crearTabla();
            this.productos=result; 
          })()         
    }


   async listar() {
        return await listarProductos();
    }

    async buscarPorId(id) {
        return await  buscarProducto(id);
    }

    async guardar(producto) {
        return await insertarProducto(producto);
    }

    async actualizar(id, datos) {
        return await actualizarProducto(id,datos);
    }

    async borrar(id) {
        return await eliminarProducto(id);
    }
    
}

// exporto una instancia de la clase
module.exports = new Productos();