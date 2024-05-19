const mongoose = require("mongoose");
const compra = require("./compra");

const historialSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  compras: { type: [compra], required: true },
});

module.exports = mongoose.model("historial", historialSchema);
