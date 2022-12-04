import React from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../../Layout/AppHeader';
import AppMain from '../../Layout/AppMain';


function Landing() {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);
  const avatar = useSelector(state => state.auth.largeProfilePicURL);
  const description = useSelector(state => state.auth.description);

  return (
    <React.Fragment>
      <AppHeader
        isAuth={isAuth}
        username={username}
        description={description}
        avatar = {avatar} />
      <React.Fragment>
        <AppMain />
      </React.Fragment>

    </React.Fragment>
  );

}

export default Landing;
