const { Reminder, User, db } = require('./models')

  const main = async () => {
  try {
    await db.sync({force: true})
    await User.create({
      name: 'Chris',
      password: 'hello',
      contact: '15165873089@tmomail.net'
    }),
    process.exit()
  } catch (err){
    console.log(err)
  }
}

main()
