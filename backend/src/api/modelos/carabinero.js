// models/Carabinero.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const carabineroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  edad: { type: Number, required: true },
  grado: { type: String, required: true },
  unidad: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  comisaria: { type: String, required: true },
  contraseña: { type: String, required: true },
});

// Antes de guardar, encripta la contraseña
carabineroSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 8);
  next();
});

const Carabinero = mongoose.model('Carabinero', carabineroSchema);

module.exports = Carabinero;
