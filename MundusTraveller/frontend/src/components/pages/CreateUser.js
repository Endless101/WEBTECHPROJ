import React, {Component} from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";


export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [{}],
            inputs: [{}]
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }


    handleFormSubmit = (event, requestType) => {
      event.preventDefault()
      const params = new URLSearchParams
      const form = event.target.parentNode.parentNode
      const firstname = form.elements.firstname.value
      const lastname = form.elements.lastname.value
      const username = form.elements.username.value
      const password = form.elements.password.value
      const confirmPassword = form.elements.confirmPassword.value
      const email = form.elements.email.value
      const DOB = form.elements.DOB.value
      params.append('firstname', firstname)
      params.append('lastname', lastname)
      params.append('username', username)
      params.append('password', password)
      params.append('confirmPassword', confirmPassword)
      params.append('email',email)
      params.append('DOB',DOB)
      axios.post("http://localhost:8000/backend/add/", params, {
          headers: {
            'Content-type':  'application/x-www-form-urlencoded'
          }
      })
      .then(res => {
          if(res.status == "200") {
              console.log(res.data.UserInfo)
              this.setState({
                  errors : new Array(res.data.UserInfo.errors),
                  inputs : new Array(res.data.UserInfo.inputs) 
              },
              ()=>console.log(this.state))
          }
          else if(res.status == "201") {
            window.location.replace("http://localhost:8000/login")
          }

      })
     
      

    };


render () {
    return (
        <body class="primary">
            <Grid item xs={12} align="right">
          <Button
            variant="contained"
            color="primary"
            to={"/"}
            component={Link}
          >
            Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            to={"/profile"}
            component={Link}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            to={"/login"}
            component={Link}
          >
            Log in
          </Button>
        </Grid>
            <form>
        <label>Firstname: <input name="firstname" id="firstname" type="text"></input></label><br></br>
        <label>Lastname: <input name="lastname" id="lastname" type="text"></input></label><br></br>
        <label>Username: <input name="username" id="username" type="text"></input></label>{this.state.errors[0].username}<br></br>
        <label>Password: <input name="password" id="password" type="password"></input></label>{this.state.errors[0].password}<br></br>
        <label>Confirm password: <input name="confirmPassword"  id="confirmPassword" type="password"></input></label>{this.state.errors[0].confirmPassword}<br></br>
        <label>Email: <input name="email" id="email" type="email"></input></label> {this.state.errors[0].email} <br></br>
        <label>Date of birth: <input name="DOB" id="DOB" type="date"></input></label><br></br>
        <label>Submit: <button type="submit" value="Submit" onClick={this.handleFormSubmit} > Submit</button> </label>
    </form>
    </body>)
}

}