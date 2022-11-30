
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProductDownload from './modules/views/ProductDownload';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
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
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductDownload />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
