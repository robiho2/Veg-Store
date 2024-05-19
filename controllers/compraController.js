const Compra = require('../models/compra');

// Controlador para crear
// exports.crear = async (req, res) => {
//     try {
//         const producto = await Producto.create(req.body);
//         res.status(201).json({ mensaje: 'Producto creado exitosamente', producto: producto });
//     } catch (error) {
//         res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
//     }
// };

exports.agregar = async (req, res) => {
    try {
        let compraActual = await Compra.findOne({ progreso:"vigente" });
        if(!compraActual){
            compraActual = await Compra.create({correo:req.body.correo, progreso:"vigente"});
            compraActual.productos.push(req.producto);
        }
        res.status(201).json({ mensaje: 'Porducto agregado exitosamente', compraActual: compraActual });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};