import React, { Component, useRef } from "react";
import axios from "axios";
import Mapbox, { Marker, Popup } from "react-map-gl";
import { Container, Col, Row } from "reactstrap";
import COUNTRIES from "../../data/countries.json";
import EUROPECOUNTRIES from "../../data/europe_countries.json";
import CountryPin from "../tools/country-pin";
import CountryInfo from "../tools/country-info";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class AddSearch extends Component {
  constructor(props) {
    super(props);
    this._getUserFromDatabase = this._getUserFromDatabase.bind(this);
    this._getUsernameFromDatabase = this._getUsernameFromDatabase.bind(this);
    this.state = {};
  }

  _getUserFromDatabase = (event) => {
    const user = document.getElementById("userID").value;
    axios.post(
      "http://localhost:8000/backend/search/",
      { user: user },
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8000/",
        },
      }
    );
  };

  _getUsernameFromDatabase = (event) => {
    const username = document.getElementById("userID").value;
    return username;
  };

  render() {
    return (
        <div>
          <input type="text" id="userID" defaultValue="John"></input>
          <div><Button
            variant="contained"
            color="primary"
            to={`/profile/${this._getUsernameFromDatabase()}`}
            component={Link}
          >
            Go to User
          </Button></div>
        </div>
    );
  }
}

/* <button onClick={this._getUserFromDatabase}>
            SEARCH
              </button> */
