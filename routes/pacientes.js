const express = require('express');
const router = express.Router();
const Paciente = require('../models/ModeloPaciente');

// Ruta de prueba para verificar token
router.get('/', (req, res) => {
  res.json({ mensaje: `Token válido. Bienvenido, ${req.usuario.nombre}` });
});

// Registrar paciente
router.post('/', async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    await nuevoPaciente.save();
    res.status(201).json({ mensaje: 'Paciente registrado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar paciente', error });
  }
});

// Obtener todos los pacientes
router.get('/todos', async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
});

// Obtener paciente por cédula
router.get('/:cedula', async (req, res) => {
  const paciente = await Paciente.findOne({ cedula: req.params.cedula });
  if (!paciente) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
  res.json(paciente);
});

// Editar paciente
router.put('/:cedula', async (req, res) => {
  const pacienteActualizado = await Paciente.findOneAndUpdate(
    { cedula: req.params.cedula },
    req.body,
    { new: true }
  );
  res.json(pacienteActualizado);
});

// Eliminar paciente
router.delete('/:cedula', async (req, res) => {
  await Paciente.findOneAndDelete({ cedula: req.params.cedula });
  res.json({ mensaje: 'Paciente eliminado correctamente' });
});

module.exports = router;
