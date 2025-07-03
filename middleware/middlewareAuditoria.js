const LogAuditoria = require('../models/ModeloLog');

const registrarAccion = (accion) => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      // Solo registrar si la respuesta fue exitosa (201 o 200, etc.)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        await LogAuditoria.create({
          uduariosId: req.usuario?._id || null,
          usuario: req.usuario?.nombre || 'Desconocido',
          accion,
          descripcion: `${accion} ejecutada en ${req.originalUrl}`,
        });
      }
    });
    next();
  };
};

module.exports = registrarAccion;