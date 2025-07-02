const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir recibir datos JSON
app.use(express.json());

// Importar middleware de autenticación
const verificarToken = require('./middleware/authMiddleware');

// Rutas públicas (no requieren token)
const rutasUsuarios = require("./routes/usuarios");
app.use("/api/usuarios", rutasUsuarios);

// Rutas protegidas (requieren token)
const rutasPacientes = require('./routes/pacientes');
app.use('/api/pacientes', verificarToken, rutasPacientes);

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del consultorio!');
});

//Ruta par Health Check de Render
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});