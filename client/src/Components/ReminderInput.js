import React from 'react';
import axios from 'axios';

export default class ReminderInput extends React.Component {
  state = {
    reminders: []
  }

   componentDidMount() {
    axios.get(`http://localhost:4567/`)
      .then(res => {
        this.setState({reminders: res.data})
    })
  }

  render() {
    return(
      <ul>
          {this.state.reminders.map(reminder => <li key={reminder.id}>{reminder.message}</li>)}
      </ul>
    )
  }
}
