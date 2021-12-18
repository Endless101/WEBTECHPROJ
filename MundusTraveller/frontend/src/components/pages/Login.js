import React,{Component} from "react"



export default class Login extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (<div><form method="post" action="/backend/login">
            <label id="email">Email: <input name="email" type="email" required></input></label><br></br>
            <label id="password">Password: <input name="password" type="password" required></input></label><br></br>
            <input type="submit" value="login"></input>
        </form>
        </div>
        
        
        )
    }
}