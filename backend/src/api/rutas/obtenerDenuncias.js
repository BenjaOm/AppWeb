const express = require('express');
const router = express.Router();
const Denuncia = require('../modelos/denuncia');

// Función para convertir el nombre del mes a su número correspondiente (0-11)
const convertirMesANumero = (mesTexto) => {
  const meses = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };
  return meses[mesTexto.toLowerCase()] || 0;
};

// Función para obtener el rango de fechas de una semana específica
const obtenerRangoFechasDeSemana = (semanaTexto) => {
  const partes = semanaTexto.split('-');
  if (partes.length !== 2) {
    return null;
  }

  const fechaPartes = partes[1].trim().split(' ');
  if (fechaPartes.length !== 3) {
    return null;
  }

  const dia = parseInt(fechaPartes[0]);
  const mes = convertirMesANumero(fechaPartes[2]);
  const añoActual = new Date().getFullYear();

  const fechaInicioSemana = new Date(añoActual, mes, dia);
  const fechaFinSemana = new Date(fechaInicioSemana);
  fechaFinSemana.setDate(fechaInicioSemana.getDate() + 6);

  return { inicioSemana: fechaInicioSemana, finSemana: fechaFinSemana };
};

// Ruta para obtener denuncias de la semana actual
router.get('/:semana', async (req, res) => {
    try {
    const { inicioSemana, finSemana } = obtenerRangoFechasDeSemana(req.params.semana);


   
    const conteoDenuncias = await Denuncia.countDocuments({
      fecha: {
       
        $gte: inicioSemana,
        $lte: finSemana,
      },
    });

    res.json({ conteo: conteoDenuncias });

  } catch (error) {
    console.error('Error al obtener denuncias de la semana:', error);
    res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
  }
});


router.get('/:año', async (req, res) => {
    try {
        const año = parseInt(req.params.año);
        const inicioAño = new Date(año, 0, 1); // Primer día del año
        const finAño = new Date(año, 11, 31); // Último día del año

        const conteoDenunciasAño = await Denuncia.countDocuments({
            fecha: {
                $gte: inicioAño,
                $lte: finAño,
            },
        });

        res.json({ conteo: conteoDenunciasAño });
    } catch (error) {
        console.error('Error al obtener el conteo anual de denuncias:', error);
        res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
});

module.exports = router;
