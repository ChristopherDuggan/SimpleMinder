import React from 'react'

export default function Header(props) {
  const {currentView} = props
  if(currentView === 'Home') {
    return (
      <header>
        <h3 className="sign-up"><a href="#">Sign Up!</a></h3> 
        <h1 className="big-logo">Simple Minder</h1>
      </header>
    )
  } else {
    return (
      <header>
        <h1 className="small-Logo">SM</h1>
        <div id="menu-buttons">
          <div>.</div>
          <div>.</div>
          <div>.</div>
        </div>
      </header>
    )
  }
}
