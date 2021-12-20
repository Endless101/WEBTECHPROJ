import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import axios from "axios";
import LandList from "./LandList";
import ReviewList from "./ReviewList";
import Logout from "./Logout";

export default class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
    };
    this.user = this.props.match.params.user;
  }

  getUserEmail = () => {
    const [coordinates, setCoordinatesFromApi] = useState([]);
    React.useEffect(() => {
      axios
        .get("http://localhost:8000/backend/getUserEmail", {
          params: { user: this.user },
        })
        .then(
          (response) => {
            this.setState({ userEmail: response.data });
          },
          (error) => {
            console.log(error);
          }
        );
    }, [coordinates.length]);
    return <div></div>;
  };

  render() {
    return (
      <body class="primary">
        <Grid container spacine={1}>
          <this.getUserEmail />
          <Grid item xs={12} align="center">
            <Typography component="h2" variant="h2">
              {this.user} 's profile
            </Typography>
          </Grid>
          <Grid container spacine={1}>
            <Grid item xs={6} align="center">
              <LandList user={this.user} />
            </Grid>
            <Grid item xs={6} align="center">
              <ReviewList
                keys={this.state.userEmail}
                owner="false"
                filter="user"
              />
              <Logout/>
            </Grid>
          </Grid>
        </Grid>
      </body>
    );
  }
}
