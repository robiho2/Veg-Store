const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser'); // Importar cookie-parse

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'];

const corsOptions = {
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          console.log("Origen rechazado:", origin);
          callback(new Error('CORS not allowed'));
      }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Algunos navegadores necesitan esto
};

// Conexión a la base de datos MongoDB
mongoose
  .connect(
    "mongodb+srv://auribel:grupo3@cluster0.jyrjbxj.mongodb.net/",
    // mongodb+srv://auribel:grupo3@cluster0.jyrjbxj.mongodb.net/
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Usar cookie-parser

// Rutas
// const historialcoRouter = require("./routes/historialRoutes");
const usuarioRoutes = require('./routes/usuarioRoutes');
const productosRoutes = require('./routes/productoRoutes');
const compraRoutes = require('./routes/compraRoutes');

// app.use("/api/historialco", historialcoRouter);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/producto', productosRoutes);
app.use('/api/compra', compraRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto 3000`);
});

