const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, { collection: 'denuncias' }); // Utiliza el nombre correcto de la colección "denuncias"

const Denuncia = mongoose.model('Denuncia', DenunciaSchema);

module.exports = Denuncia;
