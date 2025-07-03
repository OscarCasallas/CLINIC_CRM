const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  usuariosId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  accion: {
    type: String,
    required: true,
    enum: ['CREAR', 'EDITAR', 'ELIMINAR', 'LOGIN'],
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