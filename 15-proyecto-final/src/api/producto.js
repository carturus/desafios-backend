const accesoDatos= require('../persistencia/accesoDatos');

class Producto {

    constructor() {
        //carga productos de inicio
        this.productos = accesoDatos.read('./persistencia/productos.txt');
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
        accesoDatos.write('./persistencia/productos.txt',this.productos)
        return newProducto;
    }

    actualizar(id, datos) {
        datos.id = Number(id);
        let index = this.productos.findIndex(p => p.id == id);
        this.productos.splice(index, 1, datos);
        accesoDatos.write('./persistencia/productos.txt',this.productos)
        return this.productos;
    }

    borrar(id) {
        let index = this.productos.findIndex(p => p.id == id);
        let newProducto=this.productoss.splice(index, 1)
        accesoDatos.write('./persistencia/productos.txt',this.productos)
        return newProducto;
    }
}

module.exports = new Producto();