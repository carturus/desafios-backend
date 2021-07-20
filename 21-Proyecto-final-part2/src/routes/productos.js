const express = require('express');
const productosRouter = express.Router();
const productos = require('../api/producto');
const middlewares= require('../middleware/middlewares');

productosRouter.get('/listar', async (req, res) => {
    res.json(await productos.listar());
});

productosRouter.get('/listar/:id',async (req, res) => {
    let { id } = req.params;
    res.json(await productos.buscarPorId(id));
});

productosRouter.post('/guardar', 
middlewares.permisoAdministrador
  ,async (req, res) => {
    console.log(req.query)
    let producto = req.body;
    res.json(await productos.guardar(producto));
});

productosRouter.put('/actualizar/:id', middlewares.permisoAdministrador,async (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(await productos.actualizar(id, producto));
});

productosRouter.delete('/borrar/:id',middlewares.permisoAdministrador ,async (req, res) => {
    let { id } = req.params;
    res.json(await productos.borrar(id));
});

productosRouter.get('/vista', async (req, res) => {
    let prods = await productos.listar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

module.exports = productosRouter;