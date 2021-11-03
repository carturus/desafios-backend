
const controller = {};
const items = require('../api/carrito');

controller.listar=async(req,res,next)=>{
    res.json( await items.listar());
}
controller.buscar=async(req,res,next)=>{
    let { mail } = req.params;
    res.json( await items.buscar(mail));
}

controller.guardar=async(req,res,next)=>{
    let { mail} = req.params;
    let id_producto = req.body.id_producto;
    let cantidad=req.body.cantidad;
    res.json(await items.guardar(mail,id_producto,cantidad));
    //res.send('hola')
}

controller.actualizar=async(req,res,next)=>{
    let carrito= req.body;
    let { mail } = req.params;
    res.json(await items.actualizar(mail, carrito));
   
}
controller.borrar=async(req,res,next)=>{
    let { mail} = req.params;
    res.json(await items.borrar(mail));
}

module.exports = controller;
