// En authRoutes.js (o en tu archivo de rutas)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const Carabinero = require('../modelos/carabinero'); // Importa el modelo de Carabinero

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Busca al carabinero por correo
    const carabinero = await Carabinero.findOne({ correo });

    // Verifica si el carabinero existe y si la contraseña es válida
    if (!carabinero || !(await bcrypt.compare(contraseña, carabinero.contraseña))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Genera un token JWT para el carabinero
    const token = jwt.sign({ carabineroId: carabinero._id }, 'secreto', {
      expiresIn: '1h', // Puedes configurar la caducidad del token
    });

    // Devuelve el token en la respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
