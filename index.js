const express = require('express');
const mongoose = require ('mongoose');
require ('dotenv').config();//usar variables ocultas


const app = express();
const PORT = 3000;

// Middleware para permitir recibir datos JSON
app.use(express.json());

//Rutas
const rutasPacientes = require('./routes/pacientes');
app.use('/api', rutasPacientes);


const rutasUsuarios = require("./routes/usuarios");
app.use("/api/usuarios", rutasUsuarios);

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del consultorio!');
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
