
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import { authActions } from './store/reducers/auth';

import TopBar from './components/Section/TopBar';
import Footer from './components/Section/Footer';
import SectionHero from './components/Section/SectionHero';
import SectionFeatures from './components/Section/SectionFeatures';
import SectionDownload from './components/Section/SectionDownload';

import Register from './pages/Register';
import Contact from './pages/Contact';

import withRoot from './withRoot';


import DesoApi from './libs/DesoApi'

const deso = new DesoApi();

function Index() {

  const dispatch = useDispatch();

  const publicKey = useSelector(state => state.auth.publicKey);
  const isAuth = useSelector(state => state.auth.isAuthenticated);


  useEffect(() => {
    if (isAuth) {
      deso.getSingleProfile(publicKey)
        .then((response) => {
          dispatch(authActions.setProfile(response.Profile));
        })
    }
  }, [isAuth, publicKey, dispatch]);



  return (
    <React.Fragment>
      <TopBar />
      <Route exact path="/">
        <SectionHero />
        <SectionFeatures />
        <SectionDownload />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Index);
