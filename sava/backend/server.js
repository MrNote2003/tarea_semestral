const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
mongoose.set('strictQuery', true);
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5101;
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

// Rutas de la API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/reportes', require('./routes/reportes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/crearusuario', require('./routes/crearusuario'));

app.use('/api/tickets', ticketRoutes);



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
