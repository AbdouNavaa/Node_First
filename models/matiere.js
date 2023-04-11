const mongoose = require('mongoose')

const Prof = require('./Prof');

const matiereSchema = new mongoose.Schema({
  // prof: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Prof'
  // },
  name: {
    type: String,
    required: true,
    unique: true
  },
  coef: {
    type: Number,
    required: true
  },
  // user_id: {
  //   type: String,
  //   required: true
  // },
})

const Matiere = mongoose.model('Matiere', matiereSchema, 'Matieres')
module.exports = Matiere  
