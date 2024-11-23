const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contenido: { type: String, required: true },
  detalles: { type: String, required: true },
  precio: { type: String, required: true },
  fecha: { type: String, required: true } // Asegúrate de que el campo fecha esté definido
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;