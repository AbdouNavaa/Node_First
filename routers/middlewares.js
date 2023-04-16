// const Prof = require('../models/Prof');
// const Matiere = require('../models/matiere');
// const Cours = require('../models/cours');

// // Supprime les cours associés lorsque le professeur est supprimé
// Prof.pre('remove', async function(next) {
//   try {
//     await Cours.deleteMany({ prof: this._id });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // Supprime les cours associés lorsque la matière est supprimée
// Matiere.pre('remove', async function(next) {
//   try {
//     await Cours.deleteMany({ matiere: this._id });
//     next();
//   } catch (err) {
//     next(err);
//   }
// });
