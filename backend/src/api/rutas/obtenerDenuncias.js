app.get('/api/denuncias', async (req, res) => {
    try {
      const todasLasDenuncias = await Denuncia.find();
      res.send(todasLasDenuncias);
    } catch (error) {
      console.error('Error al obtener las denuncias', error);
      res.status(500).send('Error al obtener las denuncias');
    }
  });
  