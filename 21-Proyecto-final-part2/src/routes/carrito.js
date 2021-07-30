const express = require('express');
const carritoRouter = express.Router();
const carrito = require('../api/carrito');

carritoRouter.get('/listar', async (req, res) => {
    res.json(await carrito.listar());
});

carritoRouter.get('/listar/:id',async (req, res) => {
    let { id } = req.params;
    res.json(await carrito.buscarPorId(id));
});

carritoRouter.post('/agregar/:id',async (req, res) => {
    let { id } = req.params;
    res.json(await carrito.agregarPorId(id));
});


carritoRouter.delete('/borrar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carrito.borrar(id));
});

module.exports = carritoRouter;