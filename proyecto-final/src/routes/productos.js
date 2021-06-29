const express = require('express');
const productosRouter = express.Router();
const productos = require('../api/producto');

productosRouter.get('/listar', (req, res) => {
    res.json(productos.listar());
});

productosRouter.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

productosRouter.post('/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

productosRouter.put('/actualizar/:id', (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
});

productosRouter.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});

productosRouter.get('/vista', (req, res) => {
    let prods = productos.listar();
    res.render('lista', { productos: prods, hayProductos: prods.length });
});

module.exports = productosRouter;