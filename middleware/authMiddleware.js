const jwt = require('jsonwebtoken');
const Usuario = require('../models/ModeloUsuario'); // Asegúrate de tener este modelo
require('dotenv').config();

const verificarToken = async (req, res, next) => {
  const headerToken = req.header('Authorization');

  if (!headerToken || !headerToken.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado o malformado.' });
  }

  const token = headerToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    req.usuario = usuario; // Aquí sí tienes acceso a _id, nombre, etc.
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido.', error: error.message });
  }
};

module.exports = verificarToken;