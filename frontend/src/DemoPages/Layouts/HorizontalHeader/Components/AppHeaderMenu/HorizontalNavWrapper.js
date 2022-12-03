import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import { MainNav } from "./NavItemsDummy";

class Nav extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <MetisMenu content={MainNav} className="horizontal-nav-menu" activeLinkFromLocation iconNamePrefix=""/>
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
