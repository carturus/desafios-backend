const read= require('../persistencia/read');
const write = require('../persistencia/write');

class Carrito {

    constructor() {
        this.carrito = [];
    }

    listar() {
        return this.carrito;
    }

    agregarPorId(id) {
        let item = read('./persistencia/productos.txt').find(p => p.id == id);
        let producto =this.carrito.push({id:this.carrito.length+1,timestamp:Date.now(),producto: item})
        write('./persistencia/carrito.txt',this.carrito)
        return producto|| { error: `producto con id ${id} no encontrado en productos`};
    }

    borrar(id) {
        let index = this.carrito.findIndex(p => p.id == id);
        let newCarrito=this.carrito.splice(index, 1)
        write('./persistencia/carrito.txt',this.carrito)
        return newCarrito;
    }
}

module.exports = new Carrito();