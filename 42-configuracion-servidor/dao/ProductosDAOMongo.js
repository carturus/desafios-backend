//mongo
const {Producto} = require('../models/models');
const {CustomError} = require('../errores/CustomError')
const {ProductosDao}= require('./ProductosDAO')

class ProductosDaoMongo extends ProductosDao {

    constructor(){
        super()
    }
    async guardar (item){ 
        try{
     
        return await Producto.create(item);
        } catch (err) {
            throw new CustomError(500, 'error no se pudo guardar producto', err)
        }
    }
    async listar(){ 
        try{
        return await Producto.find({});
        }catch (err) {
            throw new CustomError(500, 'error no se pudieron listar productos', err)
        }
    }
    async buscar(id){ 
        try{
        return await Producto.findById(id)
        }catch (error) {
            throw new CustomError(500, 'error no se encotro prodcuto', error)
        }
    }
    async borrar(id){ 
        try{
        return await Producto.deleteOne({ _id: id});
        }catch (error) {
            throw new CustomError(500, `error al borrar producto`, error)
        }
    }
    async actualizar(id,item){ 
        try{      
            return await Producto.updateOne({_id: id}, { $set: {title: item.title, price:item.price, thumbnail:item.thumbnail}});
        }catch (error) {
            throw new CustomError(500, `error al reemplazar al producto`, error)
        }
    }

}
module.exports = {ProductosDaoMongo}