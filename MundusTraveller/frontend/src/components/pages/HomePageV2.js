import React, { Component } from "react";
import { render } from "react-dom";
import Mapbox, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";
import COUNTRIES from "../../data/countries.json";
import CityPin from "../tools/city-pin";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicGVhbnV0MjIybGluayIsImEiOiJja3d3bHBhNmcwNHNqMm9sYzJ5OHA2Z2QxIn0.WBRF5d_uHeFJNHW-iYsUxw";

const DEFAULT_VIEWPORT = {
  longitude: 10,
  latitude: 56,
  zoom: 3.5,
  bearing: 0,
  pitch: 0,
};

export default class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _renderCountryMarker = (country) => {
    console.log(country.country_code)
    return (
      <Marker
        key={country.country_code}
        latitude={country.latlng[0]}
        longitude={country.latlng[1]}
        >
          <div>MARKER</div>
        </Marker>
    );
  };

  render() {
    const { viewport, modeHandler } = this.state;
    return (
      <Mapbox
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        onViewportChange={this._updateViewport}
      >
        {COUNTRIES.map(this._renderCountryMarker)}
        
      </Mapbox>
    );
  }
}
