const Producto = require('../models/producto');

// Controlador para crear
exports.crear = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: producto });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};

exports.get = async (req, res) => {
    try {
        const email = req.params.email;
        const productos = await Producto.find({ email:email });
        res.status(201).json({ mensaje: 'Productos encontrados exitosamente', productos: productos });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};