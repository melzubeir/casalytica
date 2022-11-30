import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import Link from '@mui/material/Link';
import Button from './Button';
import { authActions } from '../../store/reducers/auth';
import PropTypes from "prop-types";


function initLogin(accessLevel, JWT) {


  return new Promise(function (resolve, reject) {

    // Create a new window for the login flow.
    function login() {
      identityWindow = window.open('https://identity.deso.org/log-in?accessLevelRequest=' +
        accessLevel, null, 'toolbar=no, width=800, height=1000, top=0, left=0');

    }

    // Check if the window is closed.
    function handleInit(e) {
      if (!init) {
        init = true;

        for (const e of pendingRequests) {
          e.source.postMessage(e, "*");
        }

        pendingRequests = []
        pm_id = e.data.id
        source = e.source
      }
      respond(e.source, e.data.id, {})
    }

    // Handle a message from the login window.
    function handleLogin(payload) {
      user = payload['users'][payload.publicKeyAdded]
      user['publicKey'] = payload.publicKeyAdded;

      if (identityWindow) {
        if (JWT === false) {
          identityWindow.close();
          identityWindow = null;
          resolve(user)
        } else {
          let payload = {
            accessLevel: user.accessLevel,
            accessLevelHmac: user.accessLevelHmac,
            encryptedSeedHex: user.encryptedSeedHex
          };
          source.postMessage({
            id: pm_id,
            service: 'identity',
            method: 'jwt',
            payload: payload
          }, "*");
        }
      }
    }


    function handleJWT(payload) {
      user['jwt'] = payload['jwt'];
      if (identityWindow) {
        identityWindow.close();
        identityWindow = null;
      }
      resolve(user);
    }


    function respond(e, t, n) {
      e.postMessage({
        id: t,
        service: "identity"
      }, "*")
    }

    window.addEventListener('message', message => {
      const { method, service, payload } = message.data;
      if (service !== "identity") {
        return
      };
      if (method === 'initialize') {
        handleInit(message);
      } else if (method === 'login') {
        handleLogin(payload);
      } else if ('jwt' in payload) {
        handleJWT(payload);
      }
    });

    let init = false;
    let pm_id = ''
    let source = null;
    let user = null;
    let pendingRequests = [];
    let identityWindow = null;

    login()

  });
}

const DesoLogin = (props) => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const handleLogin = () => {
    if (!isAuth) {
      initLogin(props.accessLevel, props.JWT).then(e => {
        dispatch(authActions.login(e));
      }).catch(e => {

        console.log('Failure: ', e)
      });
    } else {
      dispatch(authActions.logout());
    }
  }


  if (props.isButton) {
    return (
        <Button
          color={props.color}
          variant={props.variant}
          size={props.size}
          component={props.component}
          href="#"
          sx={props.sx}
          underline={props.underline}
          onClick={handleLogin}
        >
          {props.buttontext || 'Sign In'}
        </Button>
    );
  }
  return (
      <Link
        variant={props.variant}
        underline={props.underline}
        color={props.color}
        href="#"
        component={props.component}
        onClick={handleLogin}
        sx={props.sx}
      >
        {props.buttontext || 'Sign In'}
      </Link>
  );

}

DesoLogin.propTypes = {
  accessLevel: PropTypes.number.isRequired,
  JWT: PropTypes.bool,
  buttontext: PropTypes.string,
};
export default DesoLogin;
