const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contenido: { type: String, required: true },
  detalles: { type: String, required: true },
  precio: { type: String, required: true },
  fecha: { type: String, required: false },
  usado: { type: Boolean, default: false }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;