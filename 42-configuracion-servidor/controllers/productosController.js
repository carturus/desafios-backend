
const factory=require('../factory')
const config = require('../config');
let dao= factory.getDAOProducto(config.PERSISTENCIA)

const controller = {};

controller.listar=async(req,res,next)=>{
    res.json( await dao.listar());
}
controller.buscar=async(req,res,next)=>{
    let { id } = req.params;
    res.json( await dao.buscar(id));
}

controller.guardar=async(req,res,next)=>{
    let producto = req.body;
    console.log("soy el producto",producto)
    res.json(await dao.guardar(producto));
}

controller.actualizar=async(req,res,next)=>{
    let producto= req.body;
    let { id } = req.params;
    res.json(await dao.actualizar(id, producto));
   
}
controller.borrar=async(req,res,next)=>{
    let { id } = req.params;
    res.json(await dao.borrar(id));
}

module.exports = controller;
