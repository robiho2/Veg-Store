const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: String, required: true },
  cantidad: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model("producto", productoSchema);
