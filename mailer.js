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


// async..await is not allowed in global scope, must use a wrapper

async function sendReminder(recipient, message, time){
  let x = new Date
  x = x.getTime()
  console.log('this is the recipient', recipient) 
  console.log('this is the message', message)
  console.log('this is the send time: ', sendTime)
  console.log('this is the current time: ', x)
  try {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_BOT,
      pass: PASSWORD
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Simple Minder Robot" <simpleminderrobot@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: "Your SM Reminder", // Subject line
    text: message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch(err) {
    console.log(err)
  }

}


const checkDb = async () => {
  try {
    //hits endpoint on the db soivah
    const messages = await axios.get(`http://localhost:${dbPort}/`)
    const currentTime = new Date
    data = messages.data

    data.map(async reminder => {

      sendTime = reminder.sendTime
      if (currentTime >= sendTime) {
        console.log('the message should be sent')
        sendReminder(reminder.recipient, reminder.message)
        await axios.delete(`http://localhost:${dbPort}/${reminder.id}`)
      } else {
        console.log('the message should\'t be sent yet')
      }

    })


  } catch (err) {
    console.log(err)
  }
  //map through them and send those suckers
  //pass those suckers into an array to be passed to deleteEntry()
}

const deleteEntry = (entry) => {
  //map through the array and delete dem boiz
}

setInterval(() => checkDb(), 30000)
app.listen(port, () => console.log(`listening on port ${port}`))
