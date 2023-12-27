require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Denuncia = require('./api/modelos/denuncia'); // Asegúrate de que la ruta es correcta

const app = express();
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes entrantes

const rutasDenunciasValidadas = require('./api/rutas/denunciaValidada'); // Asegúrate de que la ruta es correcta
const carabinerosRouter = require('./api/rutas/rutaCarabinero'); // Asegúrate de que la ruta es correcta
const rutasDenunciasRobos = require('./api/rutas/DenunciasPorTipo'); // Asegúrate de que la ruta es correcta
const rutasFiltroSemana = require('./api/rutas/obtenerDenuncias');
const rutasFiltroAño = require('./api/rutas/obtenerDenuncias');
const rutaLogin = require('./api/rutas/Login')
const rutaDenunciasValidadasTotal = require('./api/rutas/denunciaValidada')
// Conexión a Azure Cosmos DB usando MongoDB API
const cosmosDBURL = process.env.COSMOSDB_CONNSTR;
mongoose.connect(cosmosDBURL)
  .then(() => console.log('Conectado a Azure Cosmos DB'))
  .catch(err => console.error('Error al conectar a Azure Cosmos DB', err));

// En server.js

app.use('/api', rutaLogin)
app.use('/api/denunciaValidada/total', rutaDenunciasValidadasTotal);

app.use('/api/denuncias-validadas', rutasDenunciasValidadas);
app.use('/api/carabineros', carabinerosRouter);
// En server.js
app.use('/api/denuncias/semana-actual', rutasFiltroSemana);
app.use('/api/denuncias/conteo-anual', rutasFiltroAño);

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
