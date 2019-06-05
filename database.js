const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const port = 4567
const { db, Reminder } = require('./models.js')

const sendReminder = require('./mailer.js')

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
 try {
    res.json(await Reminder.findAll())
 } catch (err) {
   console.log(err)
 }
})

app.post('/', (req, res) => res.send(sendReminder(req.body.recipient, req.body.message, req.body.time)))

app.listen(port, () => console.log(`listening on port ${port}`))
