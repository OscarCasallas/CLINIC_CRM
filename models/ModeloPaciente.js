const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    match: [/^\d{10}$/, 'La cédula debe tener exactamente 10 dígitos'],
    unique: true
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    match: [/.+\@.+\..+/, 'El correo no es válido']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    match: [/^\d{9,10}$/, 'El teléfono debe tener 9 o 10 dígitos']
  }
},
{
  timestamps: true // Agrega campos createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Paciente', pacienteSchema);