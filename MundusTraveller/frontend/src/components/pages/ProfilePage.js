import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import LandList from "./LandList";
import ReviewList from "./ReviewList";
import Review from "./Review";
import RedirectButtons from '../tools/redirect-buttons';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
    };
  }

  /* 
    Fetches the email from the currently logged-in user and stores it in the class-state
  */
  getCurrentEmail = () => {
    const [coordinates, setCoordinatesFromApi] = useState([]);
    React.useEffect(() => {
      axios
        .get("http://localhost:8000/backend/getUserEmail", {
          params: { user: "self" },
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
    Renders the Profile page of the currently logged-in user,
    showing the user's landcollection and the reviews that he has written
  */
  render() {
    return (
      <body className="primary">
        <Grid container spacing={1}>
          <this.getCurrentEmail />
          <Grid item xs={7} align="right">
            <Typography component="h2" variant="h2">
              Profile
            </Typography>
          </Grid>
          <Grid item xs={5} align="center">
            <RedirectButtons page="profile" />
          </Grid>
          <Grid item xs={6} align="center">
            <form
              id="addCountryForm"
              method="post"
              action="backend/addCountry/"
              content="raw"
              align="right"
            >
              <label>
                Country:{" "}
                <input
                  name="countryname"
                  id="countryname"
                  type="text"
                  required
                  onBlur={this.checkCountry}
                ></input>{" "}
              </label>
              <br></br>
              <select id="countryscore" name="countryscore">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <input type="submit" value="Add"></input>
            </form>
            <LandList user="self" />
          </Grid>
          <Grid item xs={6} align="center">
            <Typography component="h4" variant="h4">
              Reviews
            </Typography>
            <ReviewList
              keys={this.state.userEmail}
              owner="true"
              filter="user"
            />
            <Review id="Review" text="Enter your review here" />
          </Grid>
        </Grid>
      </body>
    );
  }
}
