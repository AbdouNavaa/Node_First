const mongoose = require('mongoose')

const Prof = require('./Prof');
const Matiere = require('./matiere');

const courSchema = new mongoose.Schema({
  prof: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prof'
  },
  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matiere'
  },
  date: {
    type: Date,
    required: true
  },
  Deb: {
    type: Date,
    required: true
  },
  Fin: {
    type: Date,
    required: true
  },
  CM: {
    type: Number,
  },
  TD: {
    type: Number,
  },
  TP: {
    type: Number,
  },
  total: { type: Number, default: 0 },
  // user_id: {
  //   type: String,
  //   required: true
  // },
})

const Cours = mongoose.model('Cours', courSchema, 'Cours')
module.exports = Cours  
