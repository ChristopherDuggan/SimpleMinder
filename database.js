const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const cors = require('cors')
const port = 4567
const { db, Reminder } = require('./models.js')

const sendReminder = require('./mailer.js')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors())

app.get('/', async (req, res) => {
 try {
    res.json(await Reminder.findAll())
 } catch (err) {
   console.log(err)
 }
})

app.get('/:id', async (req, res) => {
  try {
    res.json(await Reminder.findByPk(req.params.id))
  } catch (err) {
    console.log(err.message)
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const entry = await Reminder.findByPk(req.params.id)
    await entry.destroy()
  } catch (err) {
    console.log(err.message)
  }
})

app.post('/', async (req, res) => {
  try {
    const recipient = req.body.recipient
    const message = req.body.message
    const sendTime = req.body.sendTime
    const newReminder = Reminder.create({
      recipient: recipient,
      message: message,
      sendTime: sendTime
    })
    res.json(newReminder.id)
  } catch (err) {
    console.log(err.message)
  }
})

app.put('/:id', async (req, res) => {
  try {
    const entry = await Reminder.findByPk(req.params.id)
    entry.update(req.body)
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(port, () => console.log(`listening on port ${port}`))
