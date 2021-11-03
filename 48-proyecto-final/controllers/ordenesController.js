const controller = {};
const {sendNotificationCompra}= require('../utils/notification')
const orden = require('../api/ordenes');
const carrito= require('../api/carrito')

controller.listar=async(req,res,next)=>{
    res.json( await orden.listar());
}
controller.buscar=async(req,res,next)=>{
    let { id } = req.params;
    res.json( await orden.buscar(id));
}

controller.guardar=async(req,res,next)=>{
    let { mail} = req.params;
    let estado=req.body.estado;
    res.json(await orden.guardar(mail,estado));

}

controller.actualizar=async(req,res,next)=>{
    let estado=req.body.estado;
    let { id } = req.params;
    res.json(await orden.actualizar(id, estado));
   
}
controller.borrar=async(req,res,next)=>{
    let { id } = req.params;
    res.json(await orden.borrar(id));
}

controller.confirmar=async(req,res,next)=>{
    let { id } = req.params;
    await orden.actualizar(id, 'confirmada')
    let pedido=await orden.buscar(id)
    //se envia notificacion
    sendNotificationCompra(pedido.detalles.productos,pedido.detalles.mail)
    //Se borra carrito
    await carrito.borrar(pedido.detalles.mail)
    res.redirect('/store/home')
}

module.exports = controller;
