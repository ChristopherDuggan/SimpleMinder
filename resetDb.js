const { Reminder, db } = require('./models')

  const main = async () => {
  try {
    await db.sync({force: true})
    await Reminder.create({
      recipient: '15165873089@tmomail.net',
      message: 'we figured out what the time numbers mean. (you can do it)',
      time: '1559764800000'
    }),
    process.exit()
  } catch (err){
    console.log(err)
  }
}


main()
