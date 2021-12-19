import React,{Component} from "react"
import axios from "axios"



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
        return (<div><form method="post" action="/backend/login">
            <label id="email">Email: <input name="email" type="email" required onBlur={this.checkEmail}></input></label> {this.state.errors[0].email} <br></br>
            <label id="password">Password: <input name="password" type="password" required></input></label><br></br>
            <input type="submit" value="login"></input>
        </form>
        </div>
        
        
        )
    }
} 