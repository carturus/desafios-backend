const express = require('express');
const router = express.Router();
const productos = require('../api/productos');

router.get('/listar', async (req, res) => {
    
    res.json( await productos.listar());
});

router.get('/listar/:id', async(req, res) => {
    let { id } = req.params;
    res.json( await productos.buscarPorId(id));
});

router.post('/guardar', async (req, res) => {
    console.log("estoy en productos guardar")
    let producto = req.body;
    res.json(await productos.guardar(producto));
});

router.put('/actualizar/:id',async (req, res) => {
    let { id } = req.params
    let producto = req.body
    res.json(await productos.actualizar(id, producto));
});

router.delete('/borrar/:id', async(req, res) => {
    let { id } = req.params;
    res.json(await productos.borrar(id));
});

module.exports = router;