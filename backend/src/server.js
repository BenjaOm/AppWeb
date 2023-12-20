// server.js (o el nombre de tu archivo del servidor Express)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Denuncia = require('./api/modelos/denuncia'); // Asegúrate de que la ruta es correcta

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

app.get('/api/denuncias', async (req, res) => {
  try {
    const todasLasDenuncias = await Denuncia.find();
    res.send(todasLasDenuncias);
  } catch (error) {
    console.error('Error al obtener las denuncias', error);
    res.status(500).send('Error al obtener las denuncias');
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
