const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eventsDB')
.then(() => console.log('Connected to Mongodb...'))
.catch(err => console.log('Could not Connect to Mongodb...', err));
