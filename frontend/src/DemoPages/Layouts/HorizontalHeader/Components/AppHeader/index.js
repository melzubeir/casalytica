import React, { Fragment } from "react";
import cx from "classnames";

import { connect } from "react-redux";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeaderLogo from "../AppLogo/index";

import SearchBox from "../../../../../Layout/AppHeader/Components/SearchBox";
import UserBox from "../../../../../Layout/AppHeader/Components/UserBox";
import HeaderRightDrawer from "../../../../../Layout/AppHeader/Components/HeaderRightDrawer";

import HeaderDots from "../../../../../Layout/AppHeader/Components/HeaderDots";

class Header extends React.Component {
  render() {
    let { headerBackgroundColor, enableMobileMenuSmall } = this.props;
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" className={cx("app-header", headerBackgroundColor)} classNames="HeaderAnimation"
            appear={true} timeout={1500} enter={false} exit={false}>
            <div>  
              <HeaderLogo />
              <div
                className={cx("app-header__content", {
                  "header-mobile-open": enableMobileMenuSmall,
                })}>
                <div className="app-header-left">
                  <SearchBox />
                  <HeaderDots />
                </div>
                <div className="app-header-right">
                  <UserBox />
                  <HeaderRightDrawer />
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
