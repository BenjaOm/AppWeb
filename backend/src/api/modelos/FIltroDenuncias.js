const mongoose = require('mongoose');

const DenunciaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  descripcion: String,
  tipoDelitoSeleccionado: String,
  infoAdicional: String,
  ubicacionActual: {
    latitude: Number,
    longitude: Number
  },
  fecha: Date
});

const Denuncia = mongoose.model('Denuncia', DenunciaSchema);

module.exports = Denuncia;
