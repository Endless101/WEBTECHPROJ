/* React imports */
import React, {Component} from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core";
/* Tool imports */
import RedirectButtons from '../tools/redirect-buttons';

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [{}],
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    /**
     * Takes all the info from our form and send an AJAX post request with axios to the server
     * When a response is received we will either redirect after a 201 code or display error messages after 200 code
     * @param {*} event 
     */
    handleFormSubmit = (event) => {
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
      axios.post("/backend/add/", params, {
          headers: {
            'Content-type':  'application/x-www-form-urlencoded'
          }
      })
      .then(res => {
          if(res.status == "200") {
              this.setState({
                  errors : new Array(res.data.UserInfo.errors),
              })
          }
          else if(res.status == "201") {
            window.location.replace("../login")
          }

      })
     
      

    };
/**
 * 
 * @returns HTML form for registration
 */

render () {
    return (
        <body class="primary">
          <Grid container spacing={1}>
          <Grid item xs={4} align="center">
          </Grid>
          <Grid item xs={4} align="center">
            <Typography component="h2" variant="h2">
              Register
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <RedirectButtons page="register" />
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        <form>
        <label className="labelclass">Firstname: <input name="firstname" id="firstname" type="text"></input></label><br></br><br></br>
        <label className="labelclass">Lastname: <input name="lastname" id="lastname" type="text"></input></label><br></br><br></br>
        <label className="labelclass">Username: <input name="username" id="username" type="text"></input></label><br></br>{this.state.errors[0].username}<br></br>
        <label className="labelclass">Password: <input name="password" id="password" type="password"></input></label><br></br>{this.state.errors[0].password}<br></br>
        <label className="labelclass">Confirm password: <input name="confirmPassword"  id="confirmPassword" type="password"></input></label><br></br>{this.state.errors[0].confirmPassword}<br></br>
        <label className="labelclass">Email: <input name="email" id="email" type="email"></input></label><br></br>{this.state.errors[0].email} <br></br>
        <label className="labelclass">Date of birth: <input name="DOB" id="DOB" type="date"></input></label><br></br>
        <label className="labelclass">Submit: <button type="submit" value="Submit" onClick={this.handleFormSubmit} > Submit</button> </label>
        </form>
        </Grid>
        </Grid>
    </body>)
}

}