import React,{Component} from "react"
import axios from "axios"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { Grid } from "@material-ui/core"



export default class Login extends Component {
    constructor(props) {
        super(props)
        this.checkEmail = this.checkEmail.bind(this)
        this.state ={
            errors : [{}]
        }
    }

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
            console.log(this.state)
        })
    }
    

    render() {
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
            to={"/register"}
            component={Link}
          >
            Register
          </Button>
        </Grid>
        <div><form method="post" action="/backend/login">
            <label id="email">Email: <input name="email" type="email" required onBlur={this.checkEmail}></input></label> {this.state.errors[0].email} <br></br>
            <label id="password">Password: <input name="password" type="password" required></input></label><br></br>
            <input type="submit" value="login"></input>
        </form>
        </div>
        </body>
        
        
        )
    }
} 