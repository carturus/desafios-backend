const express = require('express');
const router = express.Router();
const productosController=require('../controllers/productosController')


router.get('/listar',productosController.listar);
router.get('/buscar/:id',productosController.buscar);
router.post('/guardar',productosController.guardar);
router.put('/actualizar/:id',productosController.actualizar);
router.delete('/borrar/:id',productosController.borrar);

module.exports = router;