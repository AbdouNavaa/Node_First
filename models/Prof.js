const mongoose = require('mongoose')
const profSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    
    date_Naissance:{
        type: Date,
        required: true
    },
    // user_id:{
    //     type: String,
    //     required: true
    // },
    
})

let Prof = mongoose.model('Prof', profSchema, 'profeusseurs')
module.exports = Prof  //pour appeler dans les autres pages