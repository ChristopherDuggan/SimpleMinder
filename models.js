const Sequelize = require('sequelize')

const db = new Sequelize({
  database: 'simple_minder',
  dialect: 'postgres',
})

const Reminder = db.define('reminder', {
  //change this mofo so the userid is attached to the reminder and the contact info is attached to the user id
  recipient: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.TEXT,
  },
  sendTime: {
    type: Sequelize.BIGINT, 
  },
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  contact: {
    type: Sequelize.STRING,
  },
})

module.exports = {
  db,
  Reminder,
  User
}
