const { Reminder, db } = require('./models')

  const main = async () => {
  try {
    await db.sync({force: true})
    await Reminder.create({
      recipient: '15165873089@tmomail.net',
      message: 'this should send at 4:15',
      sendTime: '1559765700000'
    }),
    process.exit()
  } catch (err){
    console.log(err)
  }
}


main()
