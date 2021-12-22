/* React imports */
import { Button, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CountryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        forecast: "",
        temperature: "",
      },
    };
  }
 /**
  * Will fetch current weather informtion from the OpenWeatherMap API
  */
  componentDidMount() {
    const { country } = this.props;
    const countrycode = country.country_code;
    const capital = country.capital;
    const APIKEY = "3c5ea45162d1447195406f497590c914";
    const target = `http://api.openweathermap.org/data/2.5/weather?q=${capital},${countrycode}&appid=${APIKEY}`;
    fetch(target)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: {
            forecast: data.weather[0].description,
            temperature: Math.ceil(data.main.temp - 273.15).toString() + "°C",
          },
        });
        this.forceUpdate();
      });
  }

  /*
    Renders information shown on the popup bases on a country, this includes: weather,
    name, a dynamic wikipedia link, a button to go to the review page and a flag image
  */
  render() {
    const { country } = this.props;
    const displayName = `${country.name}`;
    return (
      <div>
        <div>
          <ul>
            <li>Forecast: {this.state.data.forecast}</li>
            <li>Temperature: {this.state.data.temperature}</li>
          </ul>
          <Typography>
            {displayName} |{" "}
            <a
              target="_blank"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
            >
              Wikipedia
            </a>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            to={`/country/${displayName}`}
            component={Link}
          >
            Go to Reviews
          </Button>
        </div>
        <img width={240} src={country.flag} />
      </div>
    );
  }
}

/*
  Certain parts of this code concerning the use of MapBox and the rendering of markers was
  inspired by the example found at https://codesandbox.io/s/lthvo, this example is linked by the
  official MapBox tutorial page.
*/