const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    tipo: { type: String, required: true},
    password: { type: String, required: true},
    descripcion: { type: String, required : false, default : null},
    cedula: { type: String, required: true},
    nombreCompleto: { type: String, required: true},
    telefono: { type: String, required: true},
    correo: { type: String, required: true},
    documento: { type: String, required : false,default : null},
    numeroComercio: { type: String, required : false, default : null}
});

const usuario = mongoose.model('usuario', usuarioSchema);

module.exports = usuario;