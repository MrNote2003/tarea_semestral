const express = require('express');
const router = express.Router();
const CrearUsuario = require('../models/CrearUsuario');

router.post('/', async (req, res) => {
  const { correo, nombre, cargo, area, perfil } = req.body;
  try {
    const newUser = new CrearUsuario({
      correo,
      nombre,
      cargo,
      area,
      perfil,
    });
    //Guardado del Crear Usuario en la base de datos
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario: ' + err.message });
  }
});

module.exports = router;