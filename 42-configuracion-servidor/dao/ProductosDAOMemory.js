const {ProductosDao}= require('./ProductosDAO')
const { v4: uuidv4 } = require('uuid');

class ProductosDaoMemory extends ProductosDao {

    constructor() {
        super();
        this.productos = [];
    }

    async guardar(item) {
        let producto = { ...item };
       producto.id = uuidv4();
        this.productos.push(producto);
        return producto;
    }

    async listar() {
        return this.productos;
    }

    async buscar(id) {
        return this.productos.find(producto => producto.id == id);
    }

    async borrar(id) {
        let index = this.productos.findIndex(producto => producto.id === id);
        this.productos.splice(index, 1);
        return this.productos;
    }

    async actualizar(id, item) {
        let index = this.productos.findIndex(producto => producto.id === id);
        this.productos.splice(index, 1, item);
        return this.productos.find(producto => producto.id == id);
    }


}

module.exports ={ProductosDaoMemory}