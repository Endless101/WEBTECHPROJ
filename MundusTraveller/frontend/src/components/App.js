import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import GoogleLogin from "./pages/GoogleLogin";
import ProfilePage from "./pages/ProfilePage";
import HomePageV2 from "./pages/HomePageV2";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePageV2} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={CreateUser} />
          <Route path="/google" component={GoogleLogin} />
        </Switch>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
