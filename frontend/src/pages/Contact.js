
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '../components/UI/Typography';
import TopBar from './TopBar';
import Footer from './Footer';
import withRoot from '../withRoot';

function Contact() {
  return (
    <React.Fragment>
      <TopBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact
          </Typography>
          <p>
            holla back!
          </p>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default withRoot(Contact);
