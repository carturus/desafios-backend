const express = require('express');
const storeRouter = express.Router();
const sender= require('../utils/notification')
const productos=require('../api/productos')
const carrito=require('../api/carrito')
const orden=require('../api/ordenes')
const {checkToken}= require('../jwt/jwt')

storeRouter.get('/home',(req,res)=>{
    let user = req.user;
    res.render('home',{usuario: user.data.username})
})

storeRouter.get('/productos',async (req,res)=>{
    let user = req.user;
    let items= await productos.listar()
    res.render('productos',{productos: items.detalles,mail: user.data.mail})
 })
 storeRouter.post('/agregar/:id_producto',async (req,res)=>{
    let user = req.user;
    let {id_producto}=req.params
    let cantidad=req.body.cantidad
    await carrito.guardar(user.data.mail,id_producto,cantidad)
    res.send('<script>alert("Se agredo producto a tu carrito"); window.location.href = "/store/productos"; </script>');
 })

storeRouter.get('/carrito',async (req,res)=>{ 
    let user = req.user;
    let items=[]
    let respuestaCarrito=await carrito.buscar(user.data.mail)
    if(respuestaCarrito.estado==200) items=respuestaCarrito.detalles.productos
    res.render('carrito',{productos:items,mail:user.data.mail})
 })
 storeRouter.get('/checkout',async (req,res)=>{ 
    let user = req.user;
   let pedido= await orden.guardar(user.data.mail,'generada')
   res.render('checkout',{productos:pedido.detalles.productos,usuario:user.data,orden:pedido.detalles._id})
 })



 module.exports = storeRouter;
