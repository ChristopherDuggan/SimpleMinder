//Input fields with specefic name to identify their purpose
//handle input/change to alter state
//handle submit to pass the information on


//Login Form
<form onSubmit={(e) => handleSubmit(e)}>
  <input type="text" name="username" onChange={(e) => handleInput(e)}/>
  <input type="text" name="password" onChange={(e) => handleInput(e)}/>
</form>


//Reminder Form
<form onSubmit={(e) => handleSubmit(e)}>
  <input type="text" name="message" onChange={(e) => handleInput(e)}/>
  <input type="date" name="date" onChange={(e) => handleInput(e)}/>
  <input type="time" name="time" onChange={(e) => handleInput(e)}/>
</form>

