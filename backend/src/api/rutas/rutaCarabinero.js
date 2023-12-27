// En tu archivo routes/carabineros.js
const express = require('express');
const Carabinero = require('../modelos/carabinero');
const router = express.Router();



router.get('/nombres', async (req, res) => {
  try {
    // Consulta la base de datos para obtener los nombres y unidades de los carabineros
    const carabineros = await Carabinero.find({}, 'nombre unidad');
    res.json(carabineros);
  } catch (error) {
    console.error('Error al obtener los nombres de los carabineros:', error);
    res.status(500).send('Error al obtener los nombres de los carabineros');
  }
});



router.post('/registrar', async (req, res) => {
  try {
    const { contraseña, repetirContraseña, ...restoDeDatos } = req.body;

    if (contraseña !== repetirContraseña) {
      return res.status(400).send('Las contraseñas no coinciden');
    }

    const carabinero = new Carabinero({ ...restoDeDatos, contraseña });
    await carabinero.save();

    res.status(201).send('Carabinero registrado con éxito');
  } catch (error) {
    res.status(500).send('Error al registrar el carabinero');
  }
});





module.exports = router;
