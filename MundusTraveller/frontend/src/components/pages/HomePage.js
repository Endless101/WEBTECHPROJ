import React, { Component } from "react";
import Mapbox, {
  Marker,
  Popup,
} from "react-map-gl";
import COUNTRIES from "../../data/countries.json";
import EUROPECOUNTRIES from "../../data/europe_countries.json";
import CountryPin from "../tools/country-pin";
import CountryInfo from "../tools/country-info";

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
  };

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _renderCountryMarker = (country) => {
    return (
      <Marker
        key={country.country_code}
        latitude={country.latlng[0]}
        longitude={country.latlng[1]}
      >
        <CountryPin size={20} onClick={() => this.setState({ popupInfo: country })} />
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
          <CountryInfo info={popupInfo}/>
        </Popup>
      )
    );
  };

  render() {
    const { viewport } = this.state;

    return (
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
    );
  }
}
