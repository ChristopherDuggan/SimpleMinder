import React from 'react'

export default function Header(props) {
  const {currentView} = props
  if(currentView === 'Home') {
    return (
      <header>
        <h3 className="sign-up"><a href="#">Sign Up</a></h3> 
        <h1 className="big-logo simple">
         Simple
        </h1>
        <h1 className="big-logo minder">
          Minder
      </h1>
      </header>
    )
  } else {
    return (
      <header>
        <div className="small-logo">
          <h1 className="s">S</h1>
          <h1 className="m">M</h1>
        </div>
        <div id="menu-buttons">
            ...
        </div>
      </header>
    )
  }
}
