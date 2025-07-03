const LogAuditoria = require('../models/ModeloLog');

const registrarAccion = (accion) => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      // Solo registrar si la respuesta fue exitosa (201 o 200, etc.)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const nombrePaciente = req.body?.nombre || 'Desconocido';
        const cedulaPaciente = req.body?.cedula || 'Sin cedula';
        let descripcion = `El usuario ${req.usuario?.nombre || 'Desconocido'} realizó la accion ${accion}`;
        if (accion === 'CREAR') {
          descripcion = `El usuario ${req.usuario?.nombre} creó al paciente ${nombrePaciente} con cédula ${cedulaPaciente}`;
        } else if (accion === 'EDITAR') {
          descripcion = `El usuario ${req.usuario?.nombre} editó al paciente ${nombrePaciente} con cédula ${cedulaPaciente}`;
        } else if (accion === 'ELIMINAR') {
          descripcion = `El usuario ${req.usuario?.nombre} eliminó al paciente ${nombrePaciente} con cédula ${cedulaPaciente}`;
        }
        console.log('ID DEL USUARIO EN MIDDLEWAREAuditoria:', req.usuario?._id);
        await LogAuditoria.create({
          usuariosId: req.usuario?._id || null,
          usuario: req.usuario?.nombre || 'Desconocido',
          accion,
          descripcion,
        });
      }
    });
    next();
  };
};

module.exports = registrarAccion;