import React, { Component } from "react";
import ReviewList from "./ReviewList";
import "../../../static/css/index.css";
import { Grid } from "@material-ui/core";
import RedirectButtons from '../tools/redirect-buttons';

export default class CountryHub extends Component {
  constructor(props) {
    super(props);
    this.key = this.props.match.params.key;
  }
  /*
    Depending on the country, renders a page with the reviews that were written about said country
  */ 
  render() {
    return (
      <body class="primary">
        <div>
        <Grid item xs={12} align="right">
          <RedirectButtons page="country" />
        </Grid>
          <h3>{this.key}</h3>
          <ReviewList keys={this.key} owner="false" filter="country" />
        </div>
      </body>
    );
  }
}
