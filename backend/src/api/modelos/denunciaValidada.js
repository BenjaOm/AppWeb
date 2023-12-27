// models/DenunciaValidada.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const denunciaValidadaSchema = new Schema({
  denunciaId: mongoose.Types.ObjectId,
  nombre: String,
  direccion: String,
  descripcion: String,
  tipoDelitoSeleccionado: String,
  infoAdicional: String,
  fecha: Date,
  estado: String, // 'aprobado' o 'rechazado'
  carabineroAsignado: { type: Schema.Types.ObjectId, ref: 'Carabinero' }, // Agregar este campo
}, { timestamps: true });

const DenunciaValidada = mongoose.model('denunciavalidadas', denunciaValidadaSchema);

module.exports = DenunciaValidada;
