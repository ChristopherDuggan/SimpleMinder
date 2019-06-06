import React from 'react'

export default function LoginForm(props) {
  const { handleLogin, handleInput } = props
    return (
  <form id ="Portal" onSubmit={(e) => handleLogin(e)}>
    <label>User Name</label>
    <input type="text" name="username" onChange={(e) => handleInput(e)}/>
    <label>Password</label>
    <input type="password" name="password" onChange={(e) => handleInput(e)}/>
    <input type="submit" value="Log In"/>
  </form>
  )
}
