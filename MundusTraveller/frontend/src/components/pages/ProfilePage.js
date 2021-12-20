import React, { Component, useState } from "react";
//import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Textfield from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import axios from "axios";
import LandList from "./LandList";
import ReviewList from "./ReviewList";
import Review from "./Review";
import Logout from "./Logout";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
    };
  }

  convertOneReview = (elementFromList) => {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h6" variant="h6">
              Review of {elementFromList.Place}
            </Typography>
            <Textfield
              multiline
              maxRows={10}
              variant="standard"
              defaultValue=""
              fullWidth="true"
            />
          </Grid>
        </Grid>
      </div>
    );
  };

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
            to={"/profile/info"}
            component={Link}
          >
            Profile Info
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
