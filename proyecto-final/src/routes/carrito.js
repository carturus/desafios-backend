const express = require('express');
const carritoRouter = express.Router();
const carrito = require('../api/carrito');

carritoRouter.get('/listar', (req, res) => {
    res.json(carrito.listar());
});

carritoRouter.post('/agregar/:id', (req, res) => {
    let { id } = req.params;
    res.json(carrito.agregarPorId(id));
});


carritoRouter.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(carrito.borrar(id));
});

module.exports = carritoRouter;