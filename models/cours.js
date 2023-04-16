const mongoose = require('mongoose');

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
  total: { type: Number, default: 0 }
});

// // middleware de suppression pour supprimer automatiquement les cours associés lorsqu'un professeur ou une matière est supprimé(e)
// courSchema.pre('delete', async function (next) {
//   try {
//     await mongoose.model('Prof').updateOne({ _id: this.prof }, { $pull: { courses: this._id } });
//     await mongoose.model('Matiere').updateOne({ _id: this.matiere }, { $pull: { courses: this._id } });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const Cours = mongoose.model('Cours', courSchema, 'Cours');
module.exports = Cours;
