const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://Abdou:92MYPEiBc0pzpIMc@cluster0.upocfuf.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('Connected to Mongodb...'))
.catch(err => console.log('Could not Connect to Mongodb...', err));

// mongoose.connect('mongodb://localhost/eventsDB')
// .then(() => console.log('Connected to Mongodb...'))
// .catch(err => console.log('Could not Connect to Mongodb...', err));