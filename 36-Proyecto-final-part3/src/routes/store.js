const express = require('express');
const storeRouter = express.Router();
const sender= require('../utils/notification')
const productos=require('../api/producto')
const carrito=require('../api/carrito')

storeRouter.get('/home',(req,res)=>{
    let user = req.user;
    res.render('home',{usuario: user.username})
})

storeRouter.get('/productos',async (req,res)=>{
    let user = req.user;
    console.log(user.username)
    res.render('productos',{productos: await productos.listar(),usuario: user.username})
 })

storeRouter.get('/carrito',async (req,res)=>{ 
    res.render('carrito',{productos: await carrito.listar()})
 })
 storeRouter.get('/checkout',async (req,res)=>{ 
    sender.sendNotification(await carrito.listar(),req.user)
    res.redirect('/carrito/vaciar')
 })

 module.exports = storeRouter;
