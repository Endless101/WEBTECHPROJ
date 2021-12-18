import { Button } from "@material-ui/core";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class CountryInfo extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.name}`;

    return (
      <div>
        <div>
          {displayName} | {" "}
          <a
            target="_blank"
            href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
          >
            Wikipedia
          </a>
          <Button variant= "contained" color="primary" to={`/country/${displayName}`} component={Link}></Button>
          
        </div>
        ADD POSSIBLE IMAGE HERE
      </div>
    );
  }
}