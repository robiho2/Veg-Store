const express = require('express');
const router = express.Router();
const usuarioController = require ('../controllers/usuarioController');

router.post("/login", usuarioController.login);
router.post("/crear", usuarioController.crear);
router.post("/getPassword", usuarioController.getPassword);
router.put("/eliminar", usuarioController.eliminar);
router.put('/actualizar/:email', usuarioController.actualizar);


module.exports = router;