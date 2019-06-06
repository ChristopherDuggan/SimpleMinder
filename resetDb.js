const { Reminder, db } = require('./models')

  const main = async () => {
  try {
    await db.sync({force: true})
    await Reminder.create({
      recipient: '15165873089@tmomail.net',
      message: 'this should send at 4:25',
      sendTime: '1559766300000'
    }),
    await Reminder.create({
      recipient: '15165873089@tmomail.net',
      message: 'This message should send at 4:27',
      sendTime: '1559766420000'
    }),
    process.exit()
  } catch (err){
    console.log(err)
  }
}


main()
