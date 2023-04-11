const experss = require("express");
const router = experss();
const User = require("../models/User");
const passport = require('passport');
const multer = require('multer');

//conig multer
var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'uploads/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ '.png') 
        
    }
})

var upload = multer({storage: storage})

//Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    res.redirect('/users/login')
} 
//Login user view
router.get('/login', (req, res) => {
    res.render('user/login',{
        error: req.flash('error'),
        success: req.flash('success')
    })
})

//Login post request
router.post('/login',passport.authenticate('local.login',{
    successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
}))


//Signup user view
router.get('/signup', (req, res) => {
    res.render('user/signup',{
        error: req.flash('error'),
        success: req.flash('success')
    })
})

//Signup post request
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
}))

//Profile
router.get('/profile',isAuthenticated, (req, res) => {
    res.render('user/profile',{
        success: req.flash('success')
    })
})

//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), async (req, res) =>{
    let newField ={
        avatar: req.file.filename
    }
    try {
        await User.updateOne({_id: req.user._id}, newField);
        // req.flash('info', 'The event was created Successfuly');
        res.redirect('/users/profile/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})

//Logout
router.get('/logout', (req, res) => {
    req.logout(function(err){
        if(err){
            console.error(err);
            return next(err);
        }
        res.redirect('/users/login');
    });
});


module.exports = router