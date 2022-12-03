import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// Layout
import AppHeader from "./Components/AppHeader";
import AppHeaderMenu from "./Components/AppHeaderMenu";

import LayoutDummyContent from "../LayoutDummyContent";

import { setEnableFixedSidebar } from "../../../reducers/ThemeOptions";

class HorizontalHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="app-horizontal-header-layout">
          <AppHeader />
          <div className="app-main">
            <div className="app-main__outer">
              <AppHeaderMenu />
              <div className="app-main__inner">
                <LayoutDummyContent />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableFixedSidebar: (enable) => dispatch(setEnableFixedSidebar(!enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalHeader);
