import React, { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';

// DASHBOARDS

import OverviewDashboard from "./Overview";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import AppFooter from "../../Layout/AppFooter";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions";

import DesoApi from "../../libs/DesoApi";

const deso = new DesoApi();

const Dashboard = ({ match }) => {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const avatar = useSelector(state => state.auth.largeProfilePicURL);
  const description = useSelector(state => state.auth.description);


  useEffect(() => {
    if (isAuth) {
      deso.getDeSoPrice()
        .then((response) => {
          console.log(response);
        })
    }
  }, [isAuth]);

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


export default Dashboard;
