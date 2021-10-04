
// const factory=require('../factory')
// const config = require('../config');
// let dao= factory.getDAOProducto(config.PERSISTENCIA)
const controller = {};

const items = require('../api/productos');

controller.listar=async(req,res,next)=>{
    res.json( await items.listar());
}
controller.buscar=async(req,res,next)=>{
    let { id } = req.params;
    res.json( await items.buscar(id));
}

controller.guardar=async(req,res,next)=>{
    let producto = req.body;
    res.json(await items.guardar(producto));
}

controller.actualizar=async(req,res,next)=>{
    let producto= req.body;
    let { id } = req.params;
    res.json(await items.actualizar(id, producto));
   
}
controller.borrar=async(req,res,next)=>{
    let { id } = req.params;
    res.json(await items.borrar(id));
}

module.exports = controller;
