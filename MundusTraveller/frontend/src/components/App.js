import React, {Component} from "react"
import {render} from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateUser from "./CreateUser"
import GoogleLogin from "./GoogleLogin"
import ProfilePage from "./ProfilePage"
import Login from "./Login"
import ReviewList from "./ReviewList"
import Logout from "./Logout"
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

    render() {
        return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/login"   component={Login}/>
                <Route path="/register" component={CreateUser} />
                <Route path="/google" component={GoogleLogin} />
                <Route path="/review" component={() =><ReviewList keys="taoufikcherroud@gmail.com" owner="false" filter="user"/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/country/:key" component={CountryPage} />
            </Switch>
        </Router>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
