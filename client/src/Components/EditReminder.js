import React from 'react'

export default function EditReminder(props) {
  const { handleInput, handleEdit, key } = props
  console.log(props)
  return (
    <form id="Portal" onSubmit={(e) => handleEdit(e)}>
      <label>Date</label>
      <input type="date" name="date" onChange={(e) => handleInput(e)}/>
      <label>Time</label>
      <input type="time" name="time" onChange={(e) => handleInput(e)}/>
      <label>Recipient</label>
      <input type="text" name="recipient" onChange={(e) => handleInput(e)}/>
      <label>Message</label>
      <input type="text" name="message" onChange={(e) => handleInput(e)}/>
      <input type="submit"/>
    </form>

  )
}
