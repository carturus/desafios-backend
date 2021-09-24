
const factory=require('../factory')

let instancia= factory.getPersistenciaProducto(process.argv[6])

const controller = {};

controller.listar=async(req,res,next)=>{
    res.json( await instancia.listar());
}
controller.buscar=async(req,res,next)=>{
    let { id } = req.params;
    res.json( await instancia.buscar(id));
}

controller.guardar=async(req,res,next)=>{
    let producto = req.body;
    res.json(await instancia.guardar(producto));
}

controller.actualizar=async(req,res,next)=>{
    let { id } = req.params
    let producto = req.body
    res.json(await instancia.actualizar(id, producto));
   
}
controller.borrar=async(req,res,next)=>{
    let { id } = req.params;
    res.json(await instancia.borrar(id));
}

module.exports = controller;
