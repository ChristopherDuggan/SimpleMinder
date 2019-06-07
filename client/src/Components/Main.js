import React from 'react'
import LoginForm from './LoginForm'
import ReminderList from './ReminderList'
import NewReminder from './NewReminder'

export default function Main(props) {
  const { 
    changeView,
    currentView,
    handleSubmit,
    handleInput,
    handleLogin,
    handleNew,
    epochToDate,
    reminderDay,
    reminderTime,
    reminders
  } = props
  if(currentView === 'Home') {
    return(
      <LoginForm 
        handleInput={handleInput}
        handleLogin={handleLogin}
      />
    )
  } else if (currentView === 'Portal') {
    return(
       <ReminderList 
        changeView = {changeView}
        epochToDate = {epochToDate}
        reminderDay = {reminderDay}
        reminderTime = {reminderTime}
        reminders = {reminders}
      />
    )
  } else if (currentView === 'New'){
    return (
      <NewReminder 
        handleInput = {handleInput}
        handleSubmit = {handleSubmit}
        handleNew = {handleNew}
      />
    )
  } else {
    return (
      <h1>you messed up somewhere... current view not found</h1>
    )
  }
}
