const experss = require("express");
const router = experss();
const Event = require("../models/Event");
const {check, validationResult} = require("express-validator")
const moment = require("moment")
moment().format()

//Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
} 
//route to home
router.get('/', isAuthenticated,async (req, res) => {
 
    try {
      const events = await Event.find({});
      let chunk = []
      let chunkSize = 3
      for (let i = 0; i < events.length; i+= chunkSize) {

        chunk.push(events.slice(i, chunkSize + i))
      }
    //   res.json(events);
    res.render('event/index', {
        chunk: chunk,
        message: req.flash('info')
    })
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
  
//Create new Event
router.get('/create',isAuthenticated,(req, res) =>{
    res.render('event/create',{errors: req.flash('errors')})
})

//save Event to db
router.post('/create',[
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 chars'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 chars'),
    check('location').isLength({min: 3}).withMessage('Location also should be more than 5 chars'),
    check('date').isLength({min: 5}).withMessage('Date should be more than 5 chars')
], async (req, res) =>{
    const errors = validationResult(req)

    
    if(!errors.isEmpty()){
        // res.json(errors.array())
        req.flash('errors',errors.array())
        res.redirect('/events/create')
    }else{
        console.log(req.body);
        let newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            user_id: req.user.id,
            date: req.body.date,
            created_at: Date.now()
        })
    
        try {
            newEvent.save();
            console.log('event was added');
            req.flash('info', 'The event was created Successfuly')
            res.redirect('/events')
          } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
          }

    }
    
})

//show single event
router.get('/:id',async (req, res) => {
    try {
        const event = await Event.findOne({_id: req.params.id});
      res.render('event/show', {event: event})
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }

})

//Edit event
router.get('/edit/:id',isAuthenticated,async (req, res) =>{
    try {
        const event = await Event.findOne({_id: req.params.id});
      res.render('event/edit', {
        event: event, 
        eventDate: moment(event.date).format('YYYY-MM-DD'),
        errors: req.flash('errors'),
        message: req.flash('info')
    })
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
})
router.post('/update', [
    check('title').isLength({min: 5}).withMessage('Title should be more than 5 chars'),
    check('description').isLength({min: 5}).withMessage('Description should be more than 5 chars'),
    check('location').isLength({min: 3}).withMessage('Location also should be more than 5 chars'),
    check('date').isLength({min: 5}).withMessage('Date should be more than 5 chars')
], isAuthenticated,async (req, res) =>{
    const errors = validationResult(req)

    
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/events/edit/' + req.body.id)
    }else{
        let updateEvent = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date
        }
    
        try {
            await Event.updateOne({_id: req.body.id}, updateEvent);
            req.flash('info', 'The event was created Successfuly');
            res.redirect('/events/edit/' + req.body.id);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
});

//Delete event
router.delete('/delete/:id',isAuthenticated, async (req, res) => {
    try {
        await Event.deleteOne({_id: req.params.id});
        res.status(200).json('Deleted')
    //   res.render('event/show', {event: event})
      } catch (err) {
        console.error(err);
        res.status(404).send('There was an error event was not deleted');
      }
   
})

module.exports = router