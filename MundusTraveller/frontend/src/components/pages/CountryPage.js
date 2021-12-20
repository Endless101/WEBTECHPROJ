import React, { Component } from "react";
import ReviewList from "./ReviewList";
import "../../../static/css/index.css";
import Logout from "./Logout"

export default class CountryHub extends Component {
  constructor(props) {
    super(props);
    this.key = this.props.match.params.key;
  }
 
  render() {
    return (
      <body class="primary">
        <div>
          <h3>{this.key}</h3>
          <ReviewList keys={this.key} owner="false" filter="country" />
        </div>
        <Logout/>
      </body>
    );
  }
}
