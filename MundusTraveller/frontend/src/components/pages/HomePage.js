/* React imports */
import React, { Component } from "react";
import Mapbox, { Marker, Popup } from "react-map-gl";
import { Grid, Typography } from "@material-ui/core";
/* Tool imports */
import CountryPin from "../tools/country-pin";
import CountryInfo from "../tools/country-info";
import AddSearch from "../tools/SearchBar";
import RedirectButtons from "../tools/redirect-buttons";
/* Data imports */
import EUROPECOUNTRIES from "../../data/europe_countries.json";

/*
  API token to make use of MapBox in our HomePage
*/
const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGVhbnV0MjIybGluayIsImEiOiJja3d3bHBhNmcwNHNqMm9sYzJ5OHA2Z2QxIn0.WBRF5d_uHeFJNHW-iYsUxw";


/*
  The default position for our viewport (where the map opens), the latitude and longitude are located in europe
*/
const DEFAULT_VIEWPORT = {
  latitude: 51.6,
  longitude: 46,
  zoom: 3,
};

export default class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
        We define a viewport in our function that starts at the default one and also add popupInfo
        to keep track of the current country we're displaying the info of
      */
      viewport: DEFAULT_VIEWPORT,
      popupInfo: null,
    };
  };

  /*
    _updateViewport will allow the user to move through the map by constantly updating its position
  */
  updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  /*
    _renderCountryMarker takes a country as parameter (this will be an element out of the array defined
    in the europe_countries data file) and returns a marker using the CountryPin component, this component
    can be found in the tools section
  */
  renderCountryMarker = (country) => {
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

  /*
    Once a marker is pressed we want to show relevant information in a popup, the child of this popup
    is the CountryInfo component, this component can be found in the tools section once more
  */
  renderPopup() {
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
  };

  /*
    Renders the homepage, the Mapbox component has two children, one renders all the
    country markers while the other renders the popups.
  */

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
            <AddSearch />
          </Grid>
          <Mapbox
            {...viewport}
            width="100vw"
            height="100vh"
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={"mapbox://styles/mapbox/streets-v11"}
            onViewportChange={this.updateViewport}
          >
            {EUROPECOUNTRIES.map(this.renderCountryMarker)}
            {this.renderPopup()}
          </Mapbox>
        </Grid>
      </body>
    );
  }
}

/*
  Certain parts of this code concerning the use of MapBox and the rendering of markers was
  inspired by the example found at https://codesandbox.io/s/lthvo, this example is linked by the
  official MapBox tutorial page.
*/