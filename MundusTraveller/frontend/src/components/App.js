import React, {Component} from "react"
import {render} from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import CreateUser from "./pages/CreateUser"
import ProfilePage from "./pages/ProfilePage"
import ProfileInfo from "./pages/ProfileInfo"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import OtherProfile from "./pages/OtherProfile";
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
                <Route path="/profile/info" component={ProfileInfo} />
                <Route path="/profile/:user" component={OtherProfile} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/login"   component={Login}/>
                <Route path="/register" component={CreateUser} />
                <Route path="/country/:key" component={CountryPage} />
                <Route path="/search" component={SearchBar} />
            </Switch>
        </Router>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
