import React, { Component } from "react";
import { render } from "react-dom";

class CreateUser extends Component {
  render(){
    return (<form method="post" action="add">
      <label id="Username">Username:  </label> <input id="name" type="text"></input>
      <label id="password">Password: </label> <input type="password"></input><br></br>
      <label id="email">Email:  </label> <input type="email"></input><br></br>
      <input type="submit" value="Submit"></input>
    </form>)
  }
  
}

export default CreateUser