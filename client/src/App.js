import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import ReminderList from './Components/ReminderList'
import Header from './Components/Header'
import Main from './Components/Main'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentView: 'Home',
      reminders: [],
      date: '',
      sendTime: '',
      message: '',
      username: '',
      password: ''
    }

    this.changeView = this.changeView.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleNew = this.handleNew.bind(this)
    this.epochToDate = this.epochToDate.bind(this)
    this.reminderDay = this.reminderDay.bind(this)
    this.reminderTime = this.reminderTime.bind(this)
  }

  changeView(e){
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
    //Add actual functionality here
    console.log(e.target.id)
    //changes the view
    this.changeView(e)
  }

  async handleLogin(e) {
    e.preventDefault()
    e.persist()

    console.log(e.target)
    await axios.get(`http://localhost:4567/`)
      .then(res => {
        console.log(res.data)
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

    this.changeView(e)
  }

  epochToDate(epoch) {
    return new Date(parseInt(epoch)) 
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

  async editReminder(id) {
    
    await axios.get(`http://localhost:4567/${id}`)
      .then(res => {
        console.log(res.data)
        this.setState({reminders: res.data})
    })

  }

  async handleNew(e) {
    e.preventDefault()

    const { recipient, sendTime, message } = this.state
    const reminder = {
      recipient,
      message,
      sendTime
    }
    await axios.post(`localhost:4567`, reminder)
      .then(() => console.log('Reminder Created'))
      .catch(err => console.log(err))
  }

  render() {

  const { currentView, reminders } = this.state

  const { changeView, handleInput, handleSubmit, handleNew, epochToDate, handleLogin, reminderDay, reminderTime} = this

    return (
      <div className="App">
        <Header 
          currentView = {currentView}
        />
        <Main 
          currentView = {currentView}
          changeView = {changeView}
          handleInput = {handleInput}
          handleSubmit = {handleSubmit}
          handleNew = {handleNew}
          handleLogin = {handleLogin}
          epochToDate = {epochToDate}
          reminderDay = {reminderDay}
          reminderTime = {reminderTime}
          reminders = {reminders}
        />
      </div>
    );
  }
}

export default App;
