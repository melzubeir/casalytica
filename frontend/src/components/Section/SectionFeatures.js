import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../UI/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function SectionFeatures() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 10, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/assets/images/curvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://api.casalytica.com/static/images/icons/features/performance.png"
                alt="diamond"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                DeSo First
              </Typography>
              <Typography variant="h5">
                {'While our service is designed for any on-chain content, '}
                {'it is built with DeSo first, which is why is is aware of DeSo nodes and their operators as well.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://api.casalytica.com/static/images/icons/features/responsive.png"
                alt="computer"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Powerful API
              </Typography>
              <Typography variant="h5">
                {
                  'You pass on the basics, beginning with the post hashes and any visitor data you may have.'
                }

                {
                  'We take that and turn it into insights.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://api.casalytica.com/static/images/icons/features/retina.png"
                alt="demographics"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Demographics
              </Typography>
              <Typography variant="h5">
                {
                  'Find out where those ip addresses are coming from, devices and software '
                }

                {'used to view the on-chain content served by your app.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SectionFeatures;
