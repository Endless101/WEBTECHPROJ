import React, {Component} from "react";
import ReviewList from "./ReviewList";
export default class CountryHub extends Component {
    constructor(props) {
        super(props);
        this.key = this.props.match.params.key;
    }

    render() {
        return (
            <div>
                <h3>{this.key}</h3>
                <ReviewList keys={this.key} owner="false" filter="country"/>
            </div>
        );
      }
    }