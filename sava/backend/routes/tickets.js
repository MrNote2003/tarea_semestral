const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tickets' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.status(200).json({ message: 'Ticket eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
});

router.post('/validar-ticket', async (req, res) => {
  const { ticketId } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'El ticket no existe' });
    }
    if (ticket.usado) {
      return res.status(400).json({ message: 'El ticket ya fue usado' });
    }
    res.status(200).json({ message: 'El ticket es válido', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el ticket', error: error.message });
  }
});

router.post('/consumir-ticket', async (req, res) => {
  const { ticketId } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'El ticket no existe' });
    }
    if (ticket.usado) {
      return res.status(400).json({ message: 'El ticket ya fue usado' });
    }
    ticket.usado = true;
    await ticket.save();
    res.status(200).json({ message: 'El ticket ha sido marcado como usado', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error al consumir el ticket', error: error.message });
  }
});

module.exports = router;
