const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Endpoint para obtener la lista de usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista de usuarios', error: error.message });
  }
});

// Endpoint para crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, contraseña, rol, area, perfil, tickets } = req.body;

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña,
      rol,
      area,
      perfil,
      tickets: tickets || 0,
    });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
});

// Endpoint para editar un usuario existente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, rol, area, perfil, tickets } = req.body;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, email, contraseña, rol, area, perfil, tickets },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
});

// Endpoint para eliminar un usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente', usuario: usuarioEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
});

module.exports = router;
