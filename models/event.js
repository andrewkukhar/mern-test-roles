const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    eventName: { type: String, required: true },
    place: { type: String, required: true },
    discribe: { type: String, required: false },
    eventDate: { type: String, required: true },
},
    {
        collection: 'events'
    })

module.exports = model('Event', schema)