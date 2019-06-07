import React from 'react'

export default function EditReminder(props) {
  const { handleInput, editReminder, deleteReminder, date, time, recipient, message } = props
  return (
    <form id="Portal" onSubmit={(e) => editReminder(e)}>
      <label>Date</label>
      <input type="date" name="date" defaultValue={date} onChange={(e) => handleInput(e)}/>
      <label>Time</label>
      <input type="time" name="time" defaultValue={time} onChange={(e) => handleInput(e)}/>
      <label>Recipient</label>
      <input type="text" name="recipient" defaultValue={recipient} onChange={(e) => handleInput(e)}/>
      <label>Message</label>
      <input type="text" name="message" defaultValue={message} onChange={(e) => handleInput(e)}/>
      <input type="submit"/>
      <input type="button" value="Delete Reminder" className="delete" onClick={(e) => deleteReminder(e)} />
    </form>

  )
}
