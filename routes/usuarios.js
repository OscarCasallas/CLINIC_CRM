const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Usuario = require("../models/ModeloUsuario");
const LogAuditoria = require("../models/ModeloLog");

// REGISTRO
router.post("/registro", async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // ¿El correo ya existe?
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Correo no registrado" });
    }

    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    //Registrarlog 
    await LogAuditoria.create({
      usuariosId: usuario._id,
      usuario: usuario.nombre,
      accion: 'LOGIN',
      descripcion: `Usuario ${usuario.nombre} ha iniciado sesión`
    });

    res.json({ token, nombre: usuario.nombre});

    res.status(200).json({ mensaje: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;