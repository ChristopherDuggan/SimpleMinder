import React from 'react';
import './App.css';
import axios from 'axios'

import Header from './Components/Header'
import Main from './Components/Main'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentView: 'Home',
      reminders: [],
      date: '',
      time: '',
      recipient: '',
      message: '',
      username: '',
      password: '',
      id: ''
    }

    this.changeView = this.changeView.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.epochToDate = this.epochToDate.bind(this)
    this.getReminderList = this.getReminderList.bind(this)
    this.reminderDay = this.reminderDay.bind(this)
    this.reminderTime = this.reminderTime.bind(this)
    this.goToEdit = this.goToEdit.bind(this)
    this.editReminder = this.editReminder.bind(this)
    this.deleteReminder = this.deleteReminder.bind(this)
    this.getReminder = this.getReminder.bind(this)
    this.formattedDate = this.formattedDate.bind(this)
  } 

  async changeView(e){
    if(e.target.id === 'Portal') {
     await this.getReminderList()
    }
    this.setState({currentView: e.target.id})
  }

  handleInput(e) {
    const input = e.target.getAttribute('name')
    const value = e.target.value

    this.setState(state => {
      return {[input]: value}
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.changeView(e)
  }

  async handleLogin(e) {
    e.preventDefault()
    e.persist()

    this.getReminderList()

    this.changeView(e)
  }

  async getReminderList() {
    await axios.get(`http://localhost:4567/`)
      .then(res => {
        this.setState({reminders: res.data})
    })

    function compareTimes(a, b) {
      const time1 = a.sendTime
      const time2 = b.sendTime

      let comparison = 0;
      if (time1 > time2) {
        comparison = 1;
      } else if (time1 < time2) {
        comparison = -1;
      }
      return comparison;
    }

    this.state.reminders.sort(compareTimes)
  }

  epochToDate(epoch) {
    return new Date(parseInt(epoch)) 
  }

  formattedDate(epoch) {
    const { epochToDate } = this
    const year = epochToDate(epoch).getFullYear()
    let month = epochToDate(epoch).getMonth() + 1
    if(month < 10) {month = `0${month}`}
    let date = epochToDate(epoch).getDate()
    if(date < 10 ) { date = `0${date}`}
    return `${year}-${month}-${date}`
  }

  formattedTime(epoch) {
    const { epochToDate } = this
    let hours = epochToDate(epoch).getHours()
    if(hours < 10) {hours = `0${hours}`}
    let minutes = epochToDate(epoch).getMinutes()
    if(minutes < 10) {minutes = `0${minutes}`}
    return `${hours}:${minutes}`
  }

  reminderDay(epoch) {
    const dateObject = this.epochToDate(epoch)
    const days = ['Sun @ ','Mon @ ','Tue @ ','Wed @ ','Thu @ ','Fri @ ','Sat @ ']
    return days[dateObject.getDay()]
  }
  
  reminderTime(epoch) {
    const dateObject = this.epochToDate(epoch)
    let time = ''
    let minutes = dateObject.getMinutes()
    if(minutes < 10) {minutes = `${0}${minutes}`}
    let hours = dateObject.getHours()
    if(hours > 12) {
      hours -= 12 
      time = `${hours}:${minutes} PM`
    } else {
      time = `${hours}:${minutes} AM`
    }
    return time
  }

  async handleNew(e) {
    e.preventDefault()
    e.persist()

    const { recipient, date, time, message } = this.state
    const reminder = {
      recipient,
      message,
      sendTime: new Date(`${date} ${time}`).getTime()
    }
    
    await axios.post(`http://localhost:4567`, reminder)
      .then(() => console.log('Reminder Created'))
      .catch(err => console.log(err))

    this.changeView(e)
  }

  goToEdit(e, id) {
    this.setState({id})
    this.getReminder(id)
    this.changeView(e)
  }

  async getReminder(id) {
    await axios.get(`http://localhost:4567/${id}`)
      .then((res) => this.setState({
        recipient: res.data.recipient,
        message: res.data.message,
        date: this.formattedDate(res.data.sendTime),
        time: this.formattedTime(res.data.sendTime)
      }))
  }

  async editReminder(e) {
    e.preventDefault()
    const { recipient, date, time, message, id } = this.state
    const reminder = {
      recipient,
      message,
      sendTime: new Date(`${date} ${time}`).getTime()
    }
    
    await axios.put(`http://localhost:4567/${id}`, reminder)
      .then(() => console.log('Reminder Updated'))
      .then(this.setState({currentView: 'Portal'}))
      .catch(err => console.log(err))
  }

  async deleteReminder(e) {
    e.preventDefault()
    const { id, reminder } = this.state
    await axios.delete(`http://localhost:4567/${id}`, reminder)
      .then(() => console.log('Reminder Updated'))
      .then(this.getReminderList())
      .then(this.setState({currentView: 'Portal'}))
      .catch(err => console.log(err))
  }

  render() {

  const { currentView, reminders, id, date, time, recipient, message } = this.state

  const { changeView, handleInput, handleSubmit, handleNew, epochToDate, getReminderList, handleLogin, reminderDay, reminderTime, goToEdit, editReminder, deleteReminder} = this

    return (
      <div className="App">
        <Header 
          currentView = {currentView}
          changeView = {changeView}
        />
        <Main 
          currentView = {currentView}
          changeView = {changeView}
          handleInput = {handleInput}
          handleSubmit = {handleSubmit}
          handleNew = {handleNew}
          handleLogin = {handleLogin}
          epochToDate = {epochToDate}
          getReminderList = {getReminderList}
          reminderDay = {reminderDay}
          reminderTime = {reminderTime}
          reminders = {reminders}
          goToEdit = {goToEdit}
          editReminder = {editReminder}
          deleteReminder = {deleteReminder}
          date = {date}
          time = {time}
          recipient = {recipient}
          message = {message}
          id = {id}
        />
      </div>
    );
  }
}

export default App;
