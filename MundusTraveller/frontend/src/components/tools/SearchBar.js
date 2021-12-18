import React, { Component, useRef } from "react";
import axios from "axios";
import Mapbox, { Marker, Popup } from "react-map-gl";
import { Container, Col, Row } from "reactstrap";
import COUNTRIES from "../../data/countries.json";
import EUROPECOUNTRIES from "../../data/europe_countries.json";
import CountryPin from "../tools/country-pin";
import CountryInfo from "../tools/country-info";
import { Button } from "@material-ui/core";

export default class AddSearch extends Component {
  constructor(props) {
    super(props);
    this._getUserFromDatabase = this._getUserFromDatabase.bind(this);
    this.state = {};
  }

  _getUserFromDatabase = (event) => {
      const user = document.getElementById("userID").value
      axios.post(
          "http://localhost:8000/backend/search/",
          {"user":user},
          {headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8000/',
          }
      })
  };

  render() {
    return (
      <div>
        <input type="text" id="userID">

        </input>
        <button onClick={this._getUserFromDatabase}>
            
              </button>
      </div>
    );
  }
}
