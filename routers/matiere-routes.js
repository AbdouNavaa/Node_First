const experss = require("express");
const router = experss();
const {check, validationResult} = require("express-validator")
const moment = require("moment");
const Matiere = require("../models/matiere");
// const Prof = require("../models/Prof");
moment().format()

//Middleware to check if user is logged in
// isAuthenticated = (req, res, next) => {
//     if(req.isAuthenticated()) return next()
//     res.redirect('/users/login')
// } 

//route to home
router.get('/',async (req, res) => {
    try {
    //   const matieres = await Matiere.find({})
      // const matieres = await Matiere.find().populate('prof');
      const matieres = await Matiere.find();
      /*Pour afficher le nom du professeur dans la vue, vous pouvez utiliser la méthode populate() 
      de Mongoose pour charger les informations du professeur à partir de la référence stockée dans la propriété prof */

      let chunk = []
      let chunkSize = 3
      for (let i = 0; i < matieres.length; i+= chunkSize) {

        chunk.push(matieres.slice(i, chunkSize + i))
      }
    //   res.json(matieres);
    res.render('matiere/index', {
        chunk: chunk,
        message: req.flash('info')
    })
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


  
//Create new Matiere
router.get('/create',  async (req, res) => {
    try {
      // const teachers = await Prof.find({});
      res.render('matiere/create', { 
        // teachers: teachers, 
        errors: req.flash('errors') })
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  })
  
  

  
  router.post('/create',[
    check('name').isLength({min: 3}).withMessage('Name should be more than 3 chars'),
    check('coef').isLength({min: 1}).withMessage('coef should be more than 1 chars'),
], async (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/matieres/create')
    }else{
        const existingMatiere = await Matiere.findOne({ name: req.body.name });
        if (existingMatiere) {
            req.flash('errors', [{ msg: 'This matiere already exists.' }]);
            res.redirect('/matieres/create');
        } else {
            let newMat = new Matiere({
                name: req.body.name,
                coef: req.body.coef,
            })
        
            try {
                newMat.save();
                req.flash('info', 'The matiere was created Successfuly')
                res.redirect('/matieres')
            } catch (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
        }
    }
})


//show single Matiere
router.get('/:id',async (req, res) => {
    try {
        // const matiere = await Matiere.findOne({_id: req.params.id}).populate('prof');
        const matiere = await Matiere.findOne({_id: req.params.id});
      res.render('matiere/show', {matiere: matiere})
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }

})

//Edit Matiere
// router.get('/edit/:id',async (req, res) =>{
//     try {
//         // const matiere = await Matiere.findOne({_id: req.params.id}).populate('prof');
//         const matiere = await Matiere.findOne({_id: req.params.id});
//         // const teachers = await Prof.find({});
//       res.render('matiere/edit', {
//         matiere: matiere, 
//         // teachers: teachers, 
//         errors: req.flash('errors'),
//         message: req.flash('info')
//     })
//       } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//       }
// })
router.get('/edit/:id',async (req, res) =>{
  try {
      const matiere = await Matiere.findOne({_id: req.params.id});
    res.render('matiere/edit', {
      matiere: matiere, 
      errors: req.flash('errors'),
      message: req.flash('info')
  })
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
})
router.post('/update', [
  check('name').isLength({min: 3}).withMessage(' Name should be more than 3 chars'),
  check('coef').isLength({min: 1}).withMessage('coef should be more than 1 chars'),
],async (req, res) =>{
  const errors = validationResult(req)

  
  if(!errors.isEmpty()){
      req.flash('errors',errors.array())
      res.redirect('/matieres/edit/' + req.body.id)
  }else{
      let updateMatiere = {
          name: req.body.name,
          coef: req.body.coef,
      }
  
      try {
          await Matiere.updateOne({_id: req.body.id}, updateMatiere);
          req.flash('info', 'The Matiere was created Successfuly');
          res.redirect('/matieres/edit/' + req.body.id);
      } catch (err) {
          console.error(err);
          res.status(500).send('Server Error');
      }
  }
});


//Delete Matiere
router.delete('/delete/:id', async (req, res) => {
    try {
        await Matiere.deleteOne({_id: req.params.id});
        res.status(200).json('Deleted')
      } catch (err) {
        console.error(err);
        res.status(404).send('There was an error Matier was not deleted');
      }
   
})

module.exports = router