import React, { PureComponent } from "react";

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
        </div>
        ADD POSSIBLE IMAGE HERE
      </div>
    );
  }
}