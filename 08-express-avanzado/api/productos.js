class Productos {
    constructor() {
        // incializar variables
        this.productos=[]
    }

    listar(id){
        if(id){
             if(id <=  this.productos.length)
                return this.productos[id-1]
             else
                return {error: "producto no encontrado"}
        }
        else{
            if(this.productos.length>0)
                return this.productos
            else
                return {error: "no hay productos cargados"}
        }
    }
    guardar(producto,id){
        
        this.productos.push({id: id,...producto})
        return this.productos[id-1]
    }
    // agregar los metodos requeridos
}

// exporto una instancia de la clase
module.exports = new Productos();