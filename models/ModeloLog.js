const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  accion: {
    type: String,
    required: true,
    enum: ['CREAR', 'EDITAR', 'ELIMINAR'],
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('LogAuditoria', logSchema);