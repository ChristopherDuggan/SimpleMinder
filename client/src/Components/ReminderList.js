import React from 'react';
import axios from 'axios';

export default function ReminderList (props) {


  const { reminderDay, reminderTime, reminders, changeView } = props
    return(
      <ul>
          {reminders.map(reminder => {
            return (
              <li key={reminder.id}>
                <h1>></h1>
                {reminderDay(reminder.sendTime)}
                {reminderTime(reminder.sendTime)}
                {reminder.recipient}
                {reminder.message}
              </li>)}
            )
          }
              <li><h1 id="New" onClick={(e) => changeView(e)}>+</h1></li>
      </ul>
    )
  }
