import React, { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// DASHBOARDS

import OverviewDashboard from "./Overview";


// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";

import DesoApi from '../../libs/DesoApi'
import { authActions } from "../../store/reducers/auth";

const deso = new DesoApi();






const Dashboards = ({ match }) => {

  const dispatch = useDispatch();
  const publicKey = useSelector(state => state.auth.publicKey);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const avatar = useSelector(state => state.auth.largeProfilePicURL);
  const description = useSelector(state => state.auth.description);

  useEffect(() => {
    if (isAuth && publicKey && username === null) {
      deso.getSingleProfile(publicKey)
        .then((response) => {
          dispatch(authActions.setProfile(response.Profile));
          console.log(response.Profile);

        })
    }
  }, [isAuth, publicKey, username, dispatch]);

  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader
        isAuth={isAuth}
        username={username}
        description={description}
        avatar={avatar}
      />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <Route path={`${match.url}/overview`} component={OverviewDashboard} />
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
}


export default Dashboards;