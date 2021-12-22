/* React imports */
import axios from "axios";
import React, { Component } from "react";
import { Button } from "@material-ui/core";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios.get("/backend/logout/").then((res) => {
      if (res.status == "200")
        window.location.replace("../login");
    });
  }

  render() {
    return (
      <Button variant="contained" color="primary" onClick={this.handleLogout}>
        Log out
      </Button>
    );
  }
}
