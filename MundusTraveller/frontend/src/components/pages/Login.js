/* React imports */
import React,{Component} from "react"
import axios from "axios"
import { Grid, Typography } from "@material-ui/core"
/* Tool imports */
import RedirectButtons from '../tools/redirect-buttons';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.checkEmail = this.checkEmail.bind(this)
        this.state ={
            errors : [{}]
        }
    }
    /**
     * Sends an AJAX get request to the server with axios to check the validity of the given email
     * @param {*} event 
     */

    checkEmail(event){
        const params = new URLSearchParams
        params.append('email', event.target.value)
        axios.get("backend/login", {params: params}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            this.setState({
                errors : new Array(res.data)
            })
        })
    }
    
    /**
     * 
     * @returns HTML form for loggin in
     */

    render() {
        return (
            <body class="primary">
          <Grid container spacing={1}>
          <Grid item xs={4} align="center">
          </Grid>
          <Grid item xs={4} align="center">
            <Typography component="h2" variant="h2">
              Login
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <RedirectButtons page="login" />
          </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={1}>
          <Grid item xs={12} align="center">
        <div><form method="post" action="/backend/login">
            <label className="labelclass" id="email">Email: <input name="email" type="email" required onBlur={this.checkEmail}></input></label> <br></br>{this.state.errors[0].email} <br></br>
            <label className="labelclass" id="password">Password: <input name="password" type="password" required></input></label><br></br><br></br>
            <input type="submit" value="login"></input>
        </form>
        </div>
        </Grid>
        </Grid>
        </body>
        
        
        )
    }
} 