import React from 'react';
import axios from 'axios';

export default function ReminderList (props) {


  const { reminderDay, reminderTime, reminders, changeView, goToEdit } = props
    return(
      <ul>
          {reminders.map(reminder => {
            const id = reminder.id
            return (
              <li 
                key={reminder.id}
                className="reminder-list"
              >
                <div>
                  <h1 
                    id="Edit" 
                    className="carrot"
                    onClick={(e) => {
                      goToEdit(e, id)}
                    }
                  >
                    >
                  </h1>
                </div>
                <div className="reminder-details">
                  <h3 className="day">
                    {reminderDay(reminder.sendTime)}
                    {reminderTime(reminder.sendTime)}
                  </h3>
                  <div className="line"></div>
                  <div className="reminder-message">
                      {reminder.message}
                  </div>
                </div>
              </li>)}
            )
          }
              <li><h1 id="New" onClick={(e) => changeView(e)}>+</h1></li>
      </ul>
    )
  }
