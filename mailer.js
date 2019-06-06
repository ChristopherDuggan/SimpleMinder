
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

async function sendReminder(recipient, message, time){
  let x = new Date
  x = x.getTime()
  console.log('this is the recipient', recipient) 
  console.log('this is the message', message)
  console.log('this is the send time: ', sendTime)
  console.log('this is the current time: ', x)
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
    to: recipient, // list of receivers
    subject: "Your SM Reminder", // Subject line
    text: message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  } catch(err) {
    console.log(err)
  }

}


const checkDb = async () => {

  const sentReminders = []

  try {
    const messages = await axios.get(`http://localhost:${dbPort}/`)
    const currentTime = new Date
    data = messages.data

    data.map(async reminder => {

      sendTime = reminder.sendTime

      if (currentTime >= sendTime) {
        console.log('the message should be sent')
        sendReminder(reminder.recipient, reminder.message)
        sentReminders.push(reminder)
      } else {
        console.log('the message should\'t be sent yet')
      }

    })

    if(sentReminders.length > 0) {
      deleteEntries(sentReminders)
    }
  } catch (err) {
    console.log(err)
  }
}

const deleteEntries = (entries) => {
  entries.map(entry =>  axios.delete(`http://localhost:${dbPort}/${entry.id}`))
}

setInterval(() => checkDb(), 30000)

app.listen(port, () => console.log(`listening on port ${port}`))
