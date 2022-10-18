const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    events: [{ type: Types.ObjectId, ref: 'Event' }]
})

module.exports = model('User', schema)