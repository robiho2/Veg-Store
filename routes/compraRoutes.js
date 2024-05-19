const express = require('express');
const router = express.Router();
const compraController = require ('../controllers/compraController');

router.post("/agregar", compraController.agregar);

module.exports = router;