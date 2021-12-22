import React, { Component} from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";

export default class AddSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [{}],
    };
    this._getUsernameFromDatabase = this._getUsernameFromDatabase.bind(this);
  }

  _getUsernameFromDatabase = (event) => {
    const username = document.getElementById("userID").value;
    const params = new URLSearchParams();
    params.append("username", username);
    axios
      .get(
        "/backend/search/",
        {
          params: params,
        },
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.status == "200") {
          window.location.replace(`/profile/${username}`);
        }
        if (res.status == "201") {
          this.setState({
            errors: new Array(res.data),
          });
        }
      });
  };

  render() {
    return (
      <div>
        <Grid container spacing={1} >
          <Grid item xs={6} align="right" class="search_top_padding">
            <input type="text" id="userID" defaultValue=""></input>
            {this.state.errors[0].username}
            <br></br>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant="contained"
              color="primary"
              onClick={this._getUsernameFromDatabase}
            >
              Go to Profile
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

