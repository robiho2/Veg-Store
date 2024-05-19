const express = require('express');
const router = express.Router();
const productosController = require ('../controllers/productosController');

router.post("/crear", productosController.crear);
router.get("/get/:email", productosController.get);

module.exports = router;