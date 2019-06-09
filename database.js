const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const cors = require('cors')
const port = 4567
const { db, Reminder, User } = require('./models.js')

const sendReminder = require('./mailer.js')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors())

app.get('/', async (req,res) => {
  try {
    res.json(await User.findAll({
      include: [ Reminder]
    }))
  } catch (err) {
    console.log(err)
  }
})

app.get('/:id', async (req, res) => {
  try {
    res.json(await User.findByPk(req.params.id, {
      include: [ Reminder]
    }))
  } catch (err) {
      console.log(err)
  }
})

app.post('/', async (req, res) => {
  try{
    const name = req.body.name 
    const password = req.body.password
    const contact = req.body.contact
    const newUser = User.create({
      name: name,
      password: password,
      contact: contact
    })
    res.json(newUser.id)
  } catch (err) {
    console.log(err)
  }
})

app.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    user.update(req.body)
  } catch (err) {
    console.log(err)
  }
})

app.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(`${user.name} deleted`)
  } catch (err) {
    console.log(err.message)
  }
})

//app.get('/', async (req, res) => {
// try {
//    res.json(await Reminder.findAll())
// } catch (err) {
//   console.log(err)
// }
//})
//
//app.get('/:id', async (req, res) => {
//  try {
//    res.json(await Reminder.findByPk(req.params.id))
//  } catch (err) {
//    console.log(err.message)
//  }
//})
//
//app.delete('/:id', async (req, res) => {
//  try {
//    const entry = await Reminder.findByPk(req.params.id)
//    await entry.destroy()
//  } catch (err) {
//    console.log(err.message)
//  }
//})
//
//app.post('/', async (req, res) => {
//  try {
//    const recipient = req.body.recipient
//    const message = req.body.message
//    const sendTime = req.body.sendTime
//    const newReminder = Reminder.create({
//      recipient: recipient,
//      message: message,
//      sendTime: sendTime
//    })
//    res.json(newReminder.id)
//  } catch (err) {
//    console.log(err.message)
//  }
//})
//
//app.put('/:id', async (req, res) => {
//  try {
//    const entry = await Reminder.findByPk(req.params.id)
//    entry.update(req.body)
//  } catch (err) {
//    console.log(err.message)
//  }
//})

app.listen(port, () => console.log(`listening on port ${port}`))
