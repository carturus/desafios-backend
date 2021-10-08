
const controller = {};

const items = require('../api/productos');

controller.listar=async(req,res,next)=>{
    return await items.listar();
}
controller.buscar=async(req,res,next)=>{
    let { id } = req.params;
    res( await items.buscar(id));
}

controller.guardar=async(req,res,next)=>{
    let producto = req.body;
    return await items.guardar(producto);
}

controller.actualizar=async(req,res,next)=>{
    let producto= req.body;
    let { id } = req.params;
    return await items.actualizar(id, producto);
   
}
controller.borrar=async(req,res,next)=>{
    let { id } = req.params;
    return await items.borrar(id);
}

module.exports = controller;
