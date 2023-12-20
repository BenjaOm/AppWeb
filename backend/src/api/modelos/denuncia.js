// denuncia.js (o el nombre de tu archivo de modelo de Mongoose)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  // Estructura del subdocumento usuario si es necesario
  // ...
});

const ubicacionSchema = new Schema({
  latitud: Number,
  longitud: Number,
  // ...
});

const tipoDelitoSchema = new Schema({
  nombre: String,
  descripcion: String,
  // ...
});

const denunciaSchema = new Schema({
  IDDenucia: Number,
  Fecha: Date,
  usuario: usuarioSchema,
  descripcion: String,
  estado: String,
  ubicacion: ubicacionSchema,
  constatacionLesiones: {
    estado: String,
    descripcion: String,
    // ...
  },
  tipoDelito: tipoDelitoSchema,
  documentosAdjuntos: [{
    tipo: String,
    nombreArchivo: String,
    url: String,
  }],
  // Incluye otros campos según sea necesario
}, { collection: 'Denuncias' });

const Denuncia = mongoose.model('Denuncia', denunciaSchema);

module.exports = Denuncia;
