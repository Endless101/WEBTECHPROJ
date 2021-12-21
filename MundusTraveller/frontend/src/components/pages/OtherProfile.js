import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import LandList from "./LandList";
import ReviewList from "./ReviewList";
import RedirectButtons from '../tools/redirect-buttons';

export default class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
    };
    this.user = this.props.match.params.user;
  }
  /*
    Fetches the email from the user which profile will be rendered
  */
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
  /*
    Renders the profile of any user in the database

    Shows the user's landcollection and reviews
  */
  render() {
    return (
      <body class="primary">
        <Grid container spacine={1}>
          <this.getUserEmail />
          <Grid item xs={4} align="center">
          </Grid>
          <Grid item xs={4} align="center">
            <Typography component="h2" variant="h2">
              {this.user}'s profile
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <RedirectButtons page="otherprofile" />
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
            </Grid>
          </Grid>
        </Grid>
      </body>
    );
  }
}
