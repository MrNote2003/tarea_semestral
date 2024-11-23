const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: {
    type: String,
    enum: ['admin', 'cliente', 'cajero'], 
    default: 'admin', 
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
