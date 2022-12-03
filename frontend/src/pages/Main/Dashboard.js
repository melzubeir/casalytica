import * as React from 'react';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import Typography from '../components/UI/Typography';
import withRoot from '../withRoot';
import axios from 'axios';


let client = axios.create({
  baseURL: 'https://api.casalytica.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


function Dashboard() {

  const username = useSelector(state => state.auth.username);
  const publicKey = useSelector(state => state.auth.publicKey);


  return (
    <Container>
      <React.Fragment>
        <br />
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Your Dashboard
        </Typography>
        <br />
        <Typography variant="body3" align="left" >
          <ul>
            <li><Link
              underline="always"
              component="a"
              href="#">
              Request API token
            </Link>
            </li>
            <li><Link
              underline="always"
              component="a"
              href="#">
              Register new app
            </Link>
            </li>
          </ul>
        </Typography>
      </React.Fragment>
    </Container>
  );
}

export default withRoot(Dashboard);
