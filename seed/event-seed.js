const db = require('../config/database')
const Event = require('../models/Event')


let newEvent = [
    new Event({
            title: 'Learning english ',
            description: 'Lorem ipsum dolor sit amet, consecteur adipmkvlxvlvnxcbnb',
            location: 'NKTT',
            date: Date.now(),
            created_at: Date.now()
        }),
    new Event({
            title: 'Learning Frensh ',
            description: 'Lorem ipsum dolor sit amet, consecteur adipmkvlxvlvnxcbnb',
            location: 'NDB',
            date: Date.now(),
            created_at: Date.now()
        }),
    new Event({
            title: 'Go to the Nema',
            description: 'Lorem ipsum dolor sit amet, consecteur adipmkvlxvlvnxcbnb',
            location: 'Nema',
            date: Date.now(),
            created_at: Date.now()
        }),
    new Event({
            title: 'Learning Node JS',
            description: 'Lorem ipsum dolor sit amet, consecteur adipmkvlxvlvnxcbnb',
            location: 'NKTT',
            date: Date.now(),
            created_at: Date.now()
        }),
]

newEvent.forEach( (event) => {
    event.save()
})
// let newEvent = new Event({
//     title: 'this is Event1',
//     description: 'Tis the first Event',
//     location: 'NKTT',
//     date: Date.now()
// })

// newEvent.save()