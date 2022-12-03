
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import DiamondIcon from '@mui/icons-material/Diamond';

import Typography from '../components/UI/Typography';
import withRoot from '../withRoot';

function Contact() {
  return (
    <Container>
      <React.Fragment>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact
          </Typography>
          <div>
            <h2>
              Socials
            </h2>
            <p>
              <ul>
                <li>DeSo <DiamondIcon />: <Link href="https://diamondapp.com/u/casalytica" underline="none">@casalytica</Link></li>
                <li>email: hello@casalytica.com</li>
              </ul>
            </p>
          </div>
        </Box>
      </React.Fragment>
    </Container>
  );
}

export default withRoot(Contact);
