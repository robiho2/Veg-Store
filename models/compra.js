const mongoose = require("mongoose");
const productoSchema  = require("./producto");

const compraSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  productos: { type: Map, of: String },
  progreso: {type: String, required: false}
});

module.exports = mongoose.model("compra", compraSchema);
