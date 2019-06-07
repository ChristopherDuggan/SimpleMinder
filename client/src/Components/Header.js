import React from 'react'

export default function Header(props) {
  const {currentView, changeView} = props
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
          <h1 className="s" id="Portal" onClick={(e) => changeView(e)}>S</h1>
          <h1 className="m" id="Portal" onClick={(e) => changeView(e)}>M</h1>
        </div>
        <div id="menu-buttons">
            ...
        </div>
      </header>
    )
  }
}
