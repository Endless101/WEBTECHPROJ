import React, { Component, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default class LandList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
    };
    this.user = this.props.user;
  }
  /*
    Given a countryname and a score, returns the HTML to render this element of the collection
  */
  convertOneLand = (country, score) => {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={6} align="center">
            {country}
          </Grid>
          <Grid item xs={6} align="center">
            {score}/10
          </Grid>
        </Grid>
      </div>
    );
  };
  /*
    Fetches the list of countries from the user's collection from the database via the backend
  */
  getListFromBackend = () => {
    const [coordinates, setCoordinatesFromApi] = useState([]);
    React.useEffect(() => {
      axios
        .get("http://localhost:8000/backend/getCountryList", {
          params: { user: this.user },
        })
        .then(
          (response) => {
            this.setState({ countryList: response.data });
          },
          (error) => {
            console.log(error);
          }
        );
    }, [coordinates.length]);
  };
  /*
    After getting the collection from the database, iterates over this list to get convert
    this data into HTML
  */
  showLandList = () => {
    this.getListFromBackend();
    const ctryList = this.state.countryList;
    const convertedList = [];
    for (let i = 0; i < ctryList.length; i = i + 2) {
      convertedList.push(this.convertOneLand(ctryList[i], ctryList[i + 1]));
    }
    return <div> {convertedList} </div>;
  };
  /*
    Renders the complete collection of countries from a user
    This rendering is used in ProfilePage and in the OtherProfile (profile page of other user's)
  */
  render() {
    return (
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Collection
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} align="center">
            <Typography component="h5" variant="h5">
              Countries
            </Typography>
          </Grid>
          <Grid item xs={6} align="center">
            <Typography component="h5" variant="h5">
              Rating
            </Typography>
          </Grid>
        </Grid>
        <this.showLandList />
      </Grid>
    );
  }
}
