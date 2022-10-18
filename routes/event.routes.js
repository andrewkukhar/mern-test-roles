const express = require('express');
const Event = require('../models/event.js')
const router = express.Router()

router.get('/event', async (req, res) => {
    try {

        const events = await Event.find();
        res.status(201).json({ events })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong, try again' })
    }
})

router.get('/event/:id', async (req, res) => {
    try {
        const { eventName, place, discribe, eventDate } = req.body;
        const event = await Event.findById(req.params.id)

        res.status(201).json({ event })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong, try again' })
    }
})
router.post('/event/add', async (req, res) => {
    try {
        const { eventName, place, discribe, eventDate } = req.body;
        const existing = await Event.findOne({ eventName, place, discribe, eventDate, owner })
        if (existing) {
            return res.json({ event: existing })
        }
        const event = new Event({
            eventName, place, discribe, eventDate
        })
        await event.save()
        res.status(201).json({ event })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong, try again' })
    }
})
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateEvent = req.body;
        const options = { new: true };

        const result = await Event.findByIdAndUpdate({ id, updateEvent, options })
        res.status(201).json({ result })
    } catch (e) {
        res.status(500).json({ message: 'Something is wrong, try again' })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Event.findByIdAndDelete(id)
        res.send(`Document with ${data.eventName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;