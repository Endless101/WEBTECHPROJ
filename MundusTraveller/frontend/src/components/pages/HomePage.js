import React, { Component, useRef } from "react";
import Mapbox, { Marker, Popup } from "react-map-gl";
import { Container, Col, Row } from "reactstrap";
import COUNTRIES from "../../data/countries.json";
import EUROPECOUNTRIES from "../../data/europe_countries.json";
import CountryPin from "../tools/country-pin";
import CountryInfo from "../tools/country-info";
import { Button, Grid, Radio, Typography } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import AddSearch from "../tools/SearchBar";
import { FormControl } from "@material-ui/core";
import Logout from "./Logout"
import RedirectButtons from '../tools/redirect-buttons';


const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGVhbnV0MjIybGluayIsImEiOiJja3d3bHBhNmcwNHNqMm9sYzJ5OHA2Z2QxIn0.WBRF5d_uHeFJNHW-iYsUxw";

const DEFAULT_VIEWPORT = {
  latitude: 51.6,
  longitude: 46,
  zoom: 3,
  bearing: 0,
  pitch: 0,
};

export default class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      popupInfo: null,
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _onSelected = (viewport, item) => {
    this.setState({
      viewport,
    });
  };

  _renderCountryMarker = (country) => {
    return (
      <Marker
        key={country.country_code}
        latitude={country.latlng[0]}
        longitude={country.latlng[1]}
      >
        <CountryPin
          size={20}
          onClick={() => this.setState({ popupInfo: country })}
        />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.latlng[1]}
          latitude={popupInfo.latlng[0]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CountryInfo country={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <body className="primary">
      <Grid container spacing={1}>
        <Grid item xs={4} align="center" className="title">
          <Typography component="h4" variant="h4">
            Mundus Traveller
          </Typography>
        </Grid>
        <Grid item xs={4} align="center">
          <RedirectButtons page="home" />
        </Grid>
        <Grid item xs={4} align="left">
        <AddSearch/>
        </Grid>
        <Mapbox
          {...viewport}
          width="100vw"
          height="100vh"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          onViewportChange={this._updateViewport}
        >
          {EUROPECOUNTRIES.map(this._renderCountryMarker)}
          {this._renderPopup()}
        </Mapbox>
      </Grid>
      </body>
    );
  }
}
