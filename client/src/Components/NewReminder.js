import React from 'react'

export default function NewReminder (props) {
  const { handleInput, handleNew } = props
  return (
    <form onSubmit={(e) => handleNew(e)}>
      <label>Date</label>
      <input type="date" name="date" onChange={(e) => handleInput(e)}/>
      <label>Time</label>
      <input type="time" name="time" onChange={(e) => handleInput(e)}/>
      <label>Message</label>
      <input type="text" name="message" onChange={(e) => handleInput(e)}/>
      <input type="submit"/>
    </form>

  )
}
