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
import { desoActions } from "../../store/reducers/deso";

import DesoApi from "../../libs/DesoApi";

const deso = new DesoApi();


const Dashboard = ({ match }) => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const avatar = useSelector(state => state.auth.largeProfilePicURL);
  const description = useSelector(state => state.auth.description);
  const desoPrice = useSelector(state => state.deso.usdCentsPerDeSoCoinbase);
  const desoPosts = useSelector(state => state.deso.posts);

  useEffect(() => {
    if (!desoPrice) {
      deso.getDeSoPrice()
        .then((response) => {
          console.log(response);
          dispatch(desoActions.setDesoPrice(response));
        })
    }
    if (username) {
      deso.getPostsForPublicKey(username)
        .then((response) => {
          console.log(response);
          dispatch(desoActions.setDesoPosts(response));
        })
    }
  }, [desoPrice, desoPosts, username, dispatch]);


  return (
    <Fragment>
      { /* <ThemeOptions /> */ }
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
