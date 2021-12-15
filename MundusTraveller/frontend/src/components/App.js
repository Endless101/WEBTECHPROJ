import React, {Component} from "react"
import {render} from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateUser from "./CreateUser"
import GoogleLogin from "./GoogleLogin"
import ProfilePage from "./ProfilePage"
import Login from "./Login"
import ReviewList from "./ReviewList"

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <p>This is the home page</p>
                </Route>
                <Route path="/profile" component={ProfilePage} />
                <Route path="/login"   component={Login}/>
                <Route path="/register" component={CreateUser} />
                <Route path="/google" component={GoogleLogin} />
                <Route path="/review" component={() =><ReviewList keys="Belgium" owner="true" filter="country"/>}/>
            </Switch>
        </Router>);
    }
}

const appDiv = document.getElementById("app")
render(<App />, appDiv);