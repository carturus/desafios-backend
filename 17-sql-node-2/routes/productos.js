const express = require('express');
const router = express.Router();
const productos = require('../api/productos');

router.get('/listar', (req, res) => {
    res.json(productos.listar());
});

router.get('/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

router.post('/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

router.put('/actualizar/:id', (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(productos.actualizar(id, producto));
});

router.delete('/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});



module.exports = router;