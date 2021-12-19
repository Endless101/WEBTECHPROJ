import React, {Component} from "react"
import {render} from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateUser from "./pages/CreateUser"
import GoogleLogin from "./pages/GoogleLogin"
import ProfilePage from "./pages/ProfilePage"
import Login from "./pages/Login"
import ReviewList from "./pages/ReviewList"
import Logout from "./pages/Logout"
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import SearchBar from "./tools/SearchBar";

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
                <Route path="/review" component={() =><ReviewList keys="taoufikcherroud@gmail.com" owner="true" filter="user"/>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/country/:key" component={CountryPage} />
                <Route path="/search" component={SearchBar} />
            </Switch>
        </Router>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
