const experss = require("express");
const app = experss();

// connection to db
const db = require('./config/database');

const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

//bring ejs template
app.set('view engine', 'ejs')

//bring body parser pour retourner les donnees d'une formulaire
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//bring static
app.use(experss.static('public'))
app.use(experss.static('uploads'))
app.use(experss.static('node_modules'))

//session and flash config
app.use(session({
    secret: 'Abdou',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 100000 * 15}
}))

app.use(flash())


//bring passport
app.use(passport.initialize())
app.use(passport.session())

//store user object
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})

app.get('/', (req, res) => {
    res.redirect('/profs')
});

//bring prof routes
const profs = require('./routers/prof-routers')
app.use('/profs', profs)

//bring user routes
const users = require('./routers/user-routes')
app.use('/users', users)

//bring matiere routes
const matieres = require('./routers/matiere-routes')
app.use('/matieres', matieres)

//bring matiere routes
const courses = require('./routers/cours-routes')
app.use('/courses', courses)


//listen to port
app.listen(3000, () => {
    console.log('App is Working')
})
