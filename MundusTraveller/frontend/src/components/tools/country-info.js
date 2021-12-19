import { Button, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class CountryInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: {
        forecast: "hehe",
        temperature: "hehe"
      }
    }
  }

  componentDidMount() {
    const {country} = this.props;
    const countrycode = country.country_code
    const capital = country.capital
    const APIKEY = "3c5ea45162d1447195406f497590c914"
    const target = `http://api.openweathermap.org/data/2.5/weather?q=${capital},${countrycode}&appid=${APIKEY}`
    fetch(target)
    .then(response => response.json())
    .then(data => { this.setState({
      data: {
        forecast:data.weather[0].description,
        temperature:Math.ceil((data.main.temp - 273.15)).toString() + "°C"
      }
    })
    this.forceUpdate()})
  }
  
  


  hehe(countrycode, capital) {
    axios.get(target)
    .then(res => {
    const data = res.data
    document.getElementById("weather")
    const ul =  document.createElement("ul")
    const forecast = document.createElement("li")
    const temperature = document.createElement("li")
    temperature.textContent = Math.ceil((data.main.temperature - 273,15)).toString()
    forecast.textContent = data.weather[0].description
    ul.appendChild(temperature,forecast)

    })
  }
  render() {
    const {country} = this.props;
    const displayName = `${country.name}`;
    const code = country.country_code
    const capital = country.capital
    const APIKEY = "3c5ea45162d1447195406f497590c914"
    return (
      <div>
        <div>
          <ul>
            <li>Forecast: {this.state.data.forecast}</li>
            <li>Temperature: {this.state.data.temperature}</li>
          </ul>
          <Typography>
          {displayName} | {" "}
          <a
            target="_blank"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
          </Typography>
          <Button variant= "contained" color="primary" to={`/country/${displayName}`} component={Link}>
            Go to Reviews
          </Button>
          
        </div>
        <img width={240} src={country.flag} />
      </div>
    );
  }
}