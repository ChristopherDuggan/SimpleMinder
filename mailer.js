const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const axios = require('axios')


const port = 3030 //I want y'all to meet Deltron 0
const dbPort = 4567

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('mailer works'))

const checkDb = async () => {
  try {
    //hits endpoint on the db soivah
    const messages = await axios.get(`http://localhost:${dbPort}/`)
    const currentTime = new Date
    data = messages.data
    sendTime = data[0].sendTime
    if (currentTime >= sendTime) {
      console.log('the message should be sent')
    } else {
      console.log('the message should\'t be sent yet')
    }
  } catch (err) {
    console.log(err)
  }
  //check for messages whose timestamp to be sent is from the PAS
  //map through them and send those suckers
  //pass those suckers into an array to be passed to deleteEntry()
}

const deleteEntry = (entry) => {
  //map through the array and delete dem boiz
}

setInterval(() => checkDb(), 3000)
app.listen(port, () => console.log(`listening on port ${port}`))
