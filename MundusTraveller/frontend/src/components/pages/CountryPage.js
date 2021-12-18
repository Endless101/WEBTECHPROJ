import React, {Component} from "react";

export default class CountryHub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryName: "Germany,"
        };
        this.key = this.props.match.params.key;
    }

    render() {
        return (
            <div>
                <h3>{this.key}</h3>
                <p>{this.state.countryName}</p>
            </div>
        );
      }
    }