import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../UI/AppBar';
import Toolbar from '../UI/Toolbar';
import { useSelector } from 'react-redux';

import DesoLogin from '../UI/DesoLogin';
import logo from '../../assets/images/logo-dark.png';

const accessLevel = 2;  // no reason to ask for more permissions than we need
let JWT = true;
const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function TopBar() {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
             <img src={logo} alt="Casalytica" width="70" />
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://www.npmjs.com/package/@socialhose/casalytica"
              sx={rightLink}
            >
              {'npm'}
            </Link>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://github.com/melzubeir/casalytica"
              sx={rightLink}
            >
              {'GitHub'}
            </Link>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://api.casalytica.com"
              sx={rightLink}
            >
              {'API'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/contact"
              sx={rightLink}
            >
              {'Contact'}
            </Link>
            <DesoLogin
              accessLevel={accessLevel}
              JWT={JWT}
              variant="h6"
              isButton={false}
              color="inherit"
              underline="none"
              component="a"
              buttontext={username ? 'Logout' : 'Login'}
              sx={{ ...rightLink, color: 'secondary.main' }}
            />

          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default TopBar;
