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
    await carrito.agregarPorId(id)
    res.send('<script>alert("Se agredo producto a tu carrito"); window.location.href = "/productos"; </script>');
});


carritoRouter.delete('/borrar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carrito.borrar(id));
});

carritoRouter.get('/vaciar', async (req, res) => {
    await carrito.vaciar()
    res.render('home')
});


module.exports = carritoRouter;