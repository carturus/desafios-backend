const read= require('../persistencia/read');
const write = require('../persistencia/write');

class Producto {

    constructor() {
        this.productos = read('./persistencia/productos.txt');
        console.log(this.productos)
    }

    listar() {
        return this.productos;
    }

    buscarPorId(id) {
        let producto = this.productos.find(p => p.id == id);
        return producto || { error: `producto con id ${id} no encontrado`};
    }

    guardar(producto) {
        producto.id = this.productos.length + 1;
        producto.timestamp= Date.now();
        let newProducto=this.productos.push(producto);
        write('./persistencia/productos.txt',this.productos)
        return newProducto;
    }

    actualizar(id, datos) {
        datos.id = Number(id);
        let index = this.productos.findIndex(p => p.id == id);
        this.productos.splice(index, 1, datos);
        write('./persistencia/productos.txt',this.productos)
        return this.productos;
    }

    borrar(id) {
        let index = this.productos.findIndex(p => p.id == id);
        let newProducto=this.carrito.splice(index, 1)
        write('./persistencia/productos.txt',this.productos)
        return newProducto;
    }
}

module.exports = new Producto();