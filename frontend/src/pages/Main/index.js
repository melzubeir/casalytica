import React, { Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import ResizeDetector from "react-resize-detector";

import DesoApi from '../../libs/DesoApi'

import Landing from "./Landing";
import { authActions } from "../../store/reducers/auth";
import { desoActions } from "../../store/reducers/deso";

const deso = new DesoApi();

const Main = (props) => {

  // const [closedSmallerSiderbar, setClosedSmallerSiderbar] = React.useState(false);

  const dispatch = useDispatch();
  const publicKey = useSelector(state => state.auth.publicKey);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const desoPosts = useSelector(state => state.deso.posts);

  useEffect(() => {
    if (isAuth && publicKey && username === null) {
      deso.getSingleProfile(publicKey)
        .then((response) => {
          dispatch(authActions.setProfile(response.Profile));
          console.log(response.Profile);

        })
    }
    if (desoPosts === null && username) {
      deso.getPostsForPublicKey(username, 0, 100)
        .then((response) => {
          console.log(response);
          dispatch(desoActions.setDesoPosts(response));
        })
    }


  }, [isAuth, publicKey, username, desoPosts, dispatch]);


  let {
    colorScheme,
    enableFixedHeader,
    enableFixedSidebar,
    enableFixedFooter,
    enableClosedSidebar,
    closedSmallerSidebar,
    enableMobileMenu,
    enablePageTabsAlt,
  } = props;

  return (
    <ResizeDetector
      handleWidth
      render={({ width }) => (
        <Fragment>
          <div
            className={cx(
              "app-container app-theme-" + colorScheme,
              { "fixed-header": enableFixedHeader },
              { "fixed-sidebar": enableFixedSidebar || width < 1250 },
              { "fixed-footer": enableFixedFooter },
              { "closed-sidebar": enableClosedSidebar || width < 1250 },
              {
                "closed-sidebar-mobile": closedSmallerSidebar || width < 1250,
              },
              { "sidebar-mobile-open": enableMobileMenu },
              { "body-tabs-shadow-btn": enablePageTabsAlt }
            )}>
            <Landing />
          </div>
        </Fragment>
      )}
    />
  );
}


const mapStateToProp = (state) => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
});

export default withRouter(connect(mapStateToProp)(Main));
