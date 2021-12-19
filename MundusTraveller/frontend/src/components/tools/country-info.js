import { Button, Typography } from "@material-ui/core";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

export default class CountryInfo extends PureComponent {
  render() {
    const { country } = this.props;
    const displayName = `${country.name}`;

    return (
      <div>
        <div>
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
