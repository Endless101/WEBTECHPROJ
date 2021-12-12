import React, { Component } from "react";
import Mapbox, { Marker } from "react-map-gl";
import * as countryData from "../../data/countries.json"

const MAPBOX_TOKEN =
"pk.eyJ1IjoicGVhbnV0MjIybGluayIsImEiOiJja3d3bHBhNmcwNHNqMm9sYzJ5OHA2Z2QxIn0.WBRF5d_uHeFJNHW-iYsUxw";

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 3,
};

export default class AddMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      modeId: null,
      modeHandler: null,
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  render() {
    const { viewport, modeHandler } = this.state;
    return (
      <Mapbox
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        onViewportChange={this._updateViewport}
        >
      </Mapbox>
    );
  }
}
