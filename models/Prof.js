const mongoose = require('mongoose');
const Cours = require('./cours');

const profSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date_Naissance: {
    type: Date,
    required: true
  },
  Taux: {
    type: Number,
    required: true,
  },
});

profSchema.pre('remove', async function(next) {
  try {
    await Cours.deleteMany({ prof: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const Prof = mongoose.model('Prof', profSchema, 'profeusseurs');
module.exports = Prof;
