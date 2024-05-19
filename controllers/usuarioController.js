const Usuario = require('../models/usuario');

// Controlador para loggearse
exports.login = async (req, res) => {
    try {
        let correo = req.body.email;
        let pass = req.body.password;
        const usuario = await Usuario.findOne({ correo });
        if (usuario && usuario.password === pass) {
            res.json(usuario);
        } else {
            res.status(404).json(req.body);
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear
exports.crear = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};

exports.getPassword = async (req, res) => {
    try {
        let correo = req.body.email;
        const usuario = await Usuario.findOne({ correo });
        res.status(201).json({ mensaje: 'Datos de Usuario: '+correo, usuario: usuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        let correo = req.body.email;
        await Usuario.findOneAndDelete({correo:correo})
        res.status(201).json({ mensaje: 'Datos de Usuario: '+correo });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    const email = req.params.email;  // Obtener el email desde los parámetros de la ruta
    const actualizacion = req.body;  // Datos para actualizar

    try {
        const usuario = await Usuario.findOneAndUpdate({ correo: email }, actualizacion, { new: true });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'usuario no encontrado', test: email });
        }
        res.status(200).json({ mensaje: 'usuario actualizado exitosamente', usuario: usuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Hubo un error al actualizar el usuario', error: error.message, test: req.params });
    }
};
