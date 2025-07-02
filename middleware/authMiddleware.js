const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  const headerToken = req.header('Authorization');

  if (!headerToken || !headerToken.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado o malformado.' });
  }

  const token = headerToken.split(' ')[1]; // Solo el token

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido.' });
  }
};

module.exports = verificarToken;
