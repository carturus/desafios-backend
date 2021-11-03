const express = require('express');
const router = express.Router();
const carritoController=require('../controllers/carritoController')

router.get('/listar',carritoController.listar);
router.get('/buscar/:mail',carritoController.buscar);
router.post('/guardar/:mail',carritoController.guardar);
router.put('/actualizar/:mail',carritoController.actualizar);
router.delete('/borrar/:mail',carritoController.borrar);

module.exports = router;