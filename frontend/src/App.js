
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { useEffect } from 'react';
import Download from './pages/Download';
import Footer from './pages/Footer';
import Hero from './pages/Hero';
import Features from './pages/Features';
import TopBar from './pages/TopBar';
import Register from './pages/Register';
import Contact from './pages/Contact';
import withRoot from './withRoot';
import { authActions } from './store/reducers/auth';

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
        <Hero />
        <Features />
        <Download />
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
