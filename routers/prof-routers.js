const experss = require("express");
const router = experss();
const {check, validationResult} = require("express-validator")
const moment = require("moment");
const Prof = require("../models/Prof");
const Cours = require("../models/cours");
moment().format()

//Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
} 
//route to home
router.get('/',async (req, res) => {
    try {
      const profs = await Prof.find({});
      let chunk = []
      let chunkSize = 3
      for (let i = 0; i < profs.length; i+= chunkSize) {

        chunk.push(profs.slice(i, chunkSize + i))
      }
    //   res.json(profs);
    res.render('prof/index', {
        chunk: chunk,
        message: req.flash('info')
    })
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  

router.get('/cours', async (req, res) => {
    const profId = req.query.profId;
    const cours = await Cours.find({ prof: profId });
    res.render('prof/cours',{errors: req.flash('errors')})
    // res.json(cours);
  });


  
//Create new Prof
router.get('/create',(req, res) =>{
    res.render('prof/create',{errors: req.flash('errors')})
})

//save Prof to db
router.post('/create',[
    check('nom').isLength({min: 3}).withMessage('nom should be more than 3 chars'),
    check('prenom').isLength({min: 3}).withMessage('prenom should be more than 3 chars'),
    check('email').isLength({min: 10}).withMessage('email should be more than 10 chars'),
    check('date_Naissance').isLength({min: 5}).withMessage('date_Naissance should be more than 5 chars'),
    check('Taux').isLength({min: 3}).withMessage('Taux should existe')
], async (req, res) =>{
    const errors = validationResult(req)

    
    if(!errors.isEmpty()){
        // res.json(errors.array())
        req.flash('errors',errors.array())
        res.redirect('/profs/create')
    }else{
        console.log(req.body);
        let newProf = new Prof({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            date_Naissance: req.body.date_Naissance,
            Taux: req.body.Taux
        })
    
        try {
            newProf.save();
            console.log('prof was added');
            req.flash('info', 'The prof was created Successfuly')
            res.redirect('/profs')
          } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
          }

    }
    
})

//show single Prof
router.get('/:id',async (req, res) => {
    try {
        const prof = await Prof.findOne({_id: req.params.id});
      res.render('prof/show', {prof: prof})
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }

})

//Edit Prof
router.get('/edit/:id',async (req, res) =>{
    try {
        const prof = await Prof.findOne({_id: req.params.id});
      res.render('prof/edit', {
        prof: prof, 
        profDate: moment(prof.date_Naissance).format('YYYY-MM-DD'),
        errors: req.flash('errors'),
        message: req.flash('info')
    })
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
})
router.post('/update', [
    check('nom').isLength({min: 3}).withMessage('First Name should be more than 3 chars'),
    check('prenom').isLength({min: 3}).withMessage('Last Name should be more than 3 chars'),
    check('email').isLength({min: 10}).withMessage('email should be more than 10 chars'),
    check('date_Naissance').isLength({min: 5}).withMessage('Date should be more than 5 chars'),
    check('Taux').isLength({min: 3}).withMessage('Taux should be more than 3 numbers')
],async (req, res) =>{
    const errors = validationResult(req)

    
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/profs/edit/' + req.body.id)
    }else{
        let updateProf = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            date_Naissance: req.body.date_Naissance,
            Taux: req.body.Taux
        }
    
        try {
            await Prof.updateOne({_id: req.body.id}, updateProf);
            req.flash('info', 'The prof was created Successfuly');
            res.redirect('/profs/edit/' + req.body.id);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
});

//Delete prof
router.delete('/delete/:id', async (req, res) => {
    try {
        await Prof.deleteOne({_id: req.params.id});
        res.status(200).json('Deleted')
      } catch (err) {
        console.error(err);
        res.status(404).send('There was an error techer was not deleted');
      }
   
})

module.exports = router