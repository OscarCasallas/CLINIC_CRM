const express = require('express');
const router = express.Router();
const Paciente = require('../models/ModeloPaciente');

// Ruta para registrar un nuevo paciente
router.post('/pacientes', async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    await nuevoPaciente.save();
    res.status(201).json({ mensaje: 'Paciente registrado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar paciente', error });
  }
});

// Ruta para obtener todos los pacientes
router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener pacientes', error });
  }
});

// Ruta para obtener un paciente por cédula
router.get('/pacientes/:cedula', async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ cedula: req.params.cedula });

    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar paciente', error });
  }
});

// Ruta para actualizar un paciente por cédula
router.put('/pacientes/:cedula', async (req, res) => {
  try {
    const pacienteActualizado = await Paciente.findOneAndUpdate(
      { cedula: req.params.cedula }, // Buscar por cédula
      req.body,                      // Datos nuevos
      { new: true }                  // Devolver el documento actualizado
    );

    if (!pacienteActualizado) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.json({ mensaje: 'Paciente actualizado correctamente', paciente: pacienteActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar paciente', error });
  }
});


// Ruta para eliminar un paciente por cédula
router.delete('/pacientes/:cedula', async (req, res) => {
  try {
    const pacienteEliminado = await Paciente.findOneAndDelete({ cedula: req.params.cedula });

    if (!pacienteEliminado) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar paciente', error });
  }
});


module.exports = router;