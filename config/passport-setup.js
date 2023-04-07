const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/User')


//Saving user object in the session 
passport.serializeUser( function(user, done) {
    done(null, user.id)
})
passport.deserializeUser( async function(id, done) {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})


//Register user
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    if(req.body.password != req.body.confirme_password){
        return done(null, false, req.flash('error','Passwords do not match'))
    }else{
        try {
            const user = await User.findOne({email: username})
            if(user){
                return done(null, false,req.flash('error', 'Email already used'))
            }
            if(!user){
                // create user 
                let newUser = new User()
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password)
                newUser.avatar = "profile.png"

                try{
                    newUser.save(user)
                    return done(null, user,req.flash('success', 'User Added'))
                }catch (err) {
                    return done(err)
                }
                // return done(null, false,req.fresh('error', 'Email already used'))
            }
          } catch (err) {
            return done(err)
          }
    }
}))


//Login user
passport.use('local.login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
   
        try {
            const user = await User.findOne({email: username})
            if(user){
                if (user.comparePasswords(password, user.password)) {
                    return done(null, user,req.flash('success', 'Welcome Back'))
                } else {
                return done(null, false,req.flash('error', 'Password is Wrong'))
                }
            }
            if(!user){
                // create user 
                return done(null, false,req.flash('error', 'User not Found'))
            }
          } catch (err) {
            return done(null, false,req.flash('error', 'SomeThing wrong happened'))
          }
}))