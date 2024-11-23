const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const esValida = await bcrypt.compare(password, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      success: true, 
      token, 
      nombre: usuario.nombre, 
      rol: usuario.rol 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

router.post('/registro', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ 
      nombre, 
      email, 
      contraseña: hashPassword, 
      rol: rol || 'cliente' 
    });
    
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
});

module.exports = router;
