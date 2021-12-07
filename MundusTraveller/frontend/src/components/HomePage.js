import React, { Component } from "react";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGVhbnV0MjIybGluayIsImEiOiJja3d3bHBhNmcwNHNqMm9sYzJ5OHA2Z2QxIn0.WBRF5d_uHeFJNHW-iYsUxw";

export default class AddMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lng: -70.9,
      lat: 42.35,
      zoom: 9,
    };
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }

  render() {
    return (
      <div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
    );
  }
}
