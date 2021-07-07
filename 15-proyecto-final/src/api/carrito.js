const accesoDatos= require('../persistencia/accesoDatos');

class Carrito {

    constructor() {
        this.carrito = [];
    }

    listar() {
        return this.carrito;
    }

    agregarPorId(id) {
        let item =  accesoDatos.read('./persistencia/productos.txt').find(p => p.id == id);
        let producto =this.carrito.push({id:this.carrito.length+1,timestamp:Date.now(),producto: item})
        accesoDatos.write('./persistencia/carrito.txt',this.carrito)
        return producto|| { error: `producto con id ${id} no encontrado en productos`};
    }

    borrar(id) {
        let index = this.carrito.findIndex(p => p.id == id);
        let newCarrito=this.carrito.splice(index, 1)
        accesoDatos.write('./persistencia/carrito.txt',this.carrito)
        return newCarrito;
    }
}

module.exports = new Carrito();