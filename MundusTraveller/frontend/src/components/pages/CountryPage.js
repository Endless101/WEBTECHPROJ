import React, { Component } from "react";
import ReviewList from "./ReviewList";
import "../../../static/css/index.css";
import Logout from "./Logout"
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class CountryHub extends Component {
  constructor(props) {
    super(props);
    this.key = this.props.match.params.key;
  }
 
  render() {
    return (
      <body class="primary">
        <div>
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
          <Button
            variant="contained"
            color="primary"
            to={"/login"}
            component={Link}
          >
            Log in
          </Button>
          <Logout/>
        </Grid>
          <h3>{this.key}</h3>
          <ReviewList keys={this.key} owner="false" filter="country" />
        </div>
      </body>
    );
  }
}
