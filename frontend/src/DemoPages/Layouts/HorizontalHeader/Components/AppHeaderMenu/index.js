import React, { Fragment } from "react";
// import {Route} from 'react-router-dom';
import Nav from "./HorizontalNavWrapper";

// Layout

const HeaderMenu = ({ match }) => (
  <Fragment>
    <div className="app-header-menu">
      <Nav />
    </div>
  </Fragment>
);

export default HeaderMenu;
