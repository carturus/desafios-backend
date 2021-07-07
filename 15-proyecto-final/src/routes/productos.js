const express = require('express');
const productosRouter = express.Router();
const productos = require('../api/producto');
const middlewares= require('../middleware/middlewares');

productosRouter.get('/listar', (req, res) => {
    res.json(productos.listar());
});

productosRouter.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

productosRouter.post('/guardar', 
middlewares.permisoAdministrador
  ,(req, res) => {
    console.log(req.query)
    let producto = req.body;
    res.json(productos.guardar(producto));
});

productosRouter.put('/actualizar/:id', middlewares.permisoAdministrador,(req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
});

productosRouter.delete('/borrar/:id',middlewares.permisoAdministrador ,(req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});

productosRouter.get('/vista', (req, res) => {
    let prods = productos.listar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

module.exports = productosRouter;