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
  area: { type: String, default: '' },
  perfil: { type: String, default: '' },
  tickets: { type: Number, default: 0 },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
