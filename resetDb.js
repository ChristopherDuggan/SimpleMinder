const { Reminder, User, db } = require('./models')

  const main = async () => {
  try {
    await db.sync({force: true})
    await User.create({
      name: 'Chris',
      password: 'hello',
      contact: '15165873089@tmomail.net'
    }),
    await Reminder.create({
      message: 'this should be associated',
      sendTime: 1560114058000,
      userId: 1
    }),
    process.exit()
  } catch (err){
    console.log(err)
  }
}

main()
