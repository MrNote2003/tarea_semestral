const express = require('express');
const router = express.Router();

// Endpoint para obtener el reporte de ventas
router.get('/ventas', (req, res) => {
  try {
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el reporte de ventas', error: error.message });
  }
});

module.exports = router;
