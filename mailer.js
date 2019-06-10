const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const axios = require('axios')

const nodemailer = require("nodemailer");
require('dotenv').config( ) 
const { MAIL_BOT, PASSWORD } = process.env

const port = 3030 //I want y'all to meet Deltron 0
const dbPort = 4567

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('mailer works'))

async function sendReminder(contact, message, time){
  try {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_BOT,
      pass: PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: '"Simple Minder Robot" <simpleminderrobot@gmail.com>', // sender address
    to: contact,
    subject: "Your SM Reminder",
    text: message,
  });

  console.log("Message sent: %s", info.messageId);
  } catch(err) {
    console.log(err)
  }

}


const checkDb = async () => {

  const sentReminders = []

  try {
    const messages = await axios.get(`http://localhost:${dbPort}/mailer/check`)
    const currentTime = new Date
    data = messages.data

    data.map(async reminder => {

      sendTime = reminder.sendTime

      if (currentTime >= sendTime) {
        sendReminder(reminder.user.contact, reminder.message)
        sentReminders.push(reminder)
      }

    })

  } catch (err) {
    console.log(err)
  }
  if(sentReminders.length > 0) {
    deleteEntries(sentReminders)
  }
}

const deleteEntries = (entries) => {
  entries.map(entry =>  axios.delete(`http://localhost:${dbPort}/:id/${entry.id}`))
}

setInterval(() => checkDb(), 30000)

app.listen(port, () => console.log(`listening on port ${port}`))
