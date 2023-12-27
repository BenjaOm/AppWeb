const express = require('express');
const router = express.Router();
const DenunciaValidada = require('../modelos/denunciaValidada'); // Asegúrate de que la ruta es correcta

// Ruta para validar una denuncia



// routes/denunciaValidada.js
router.get('/', async (req, res) => {
  try {
    const denunciasValidadas = await DenunciaValidada.find().populate('carabineroAsignado', 'nombre');
    res.json(denunciasValidadas);
  } catch (error) {
    console.error('Error al obtener las denuncias validadas', error);
    res.status(500).send('Error al obtener las denuncias validadas');
  }
});



router.get('/total', async (req, res) => {
  try {
    const totalDenunciasValidadas = await DenunciaValidada.countDocuments();
    res.json({ total: totalDenunciasValidadas });
  } catch (error) {
    console.error('Error al obtener el número total de denuncias validadas', error);
    res.status(500).send('Error al obtener el número total de denuncias validadas');
  }
});



// routes/denunciaValidada.js
// routes/denunciaValidada.js
// Ruta para validar una denuncia
router.post('/validar', async (req, res) => {
  try {
    const { denunciaId, nombre, direccion, descripcion, tipoDelitoSeleccionado, infoAdicional, fecha, estado, carabineroSeleccionado } = req.body;

    // Primero, elimina la denuncia de la colección original por su ID
    await Denuncia.findByIdAndDelete(denunciaId);

    // Luego, guarda la denuncia validada en la nueva colección
    let nuevaDenunciaValidada = new DenunciaValidada({
      denunciaId,
      nombre,
      direccion,
      descripcion,
      tipoDelitoSeleccionado,
      infoAdicional,
      fecha,
      estado,
      carabineroAsignado: carabineroSeleccionado, // Asignar el carabinero seleccionado
    });

    await nuevaDenunciaValidada.save();
    res.status(201).json(nuevaDenunciaValidada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});






module.exports = router;
