const express = require('express');
const router = express.Router();
const ordenesController=require('../controllers/ordenesController')

router.get('/listar',ordenesController.listar);
router.get('/buscar/:id',ordenesController.buscar);
router.post('/guardar/:mail',ordenesController.guardar);
router.put('/actualizar/:id',ordenesController.actualizar);
router.delete('/borrar/:id',ordenesController.borrar);
router.get('/confirmar/:id',ordenesController.confirmar);

module.exports = router;