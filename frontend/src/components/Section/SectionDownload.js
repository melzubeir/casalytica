import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../UI/Button';
import Typography from '../UI/Typography';

import npmlogo from '../../assets/images/npm-logo.png';
import githublogo from '../../assets/images/github-logo.png';
import code from '../../assets/images/code.png';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function SectionDownload() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Download
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={githublogo}
                  alt="github"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Straight from the source.. code. Grab the latest from
                  the repository <a href="https://github.com/melzubeir/casalytica">here</a>.

                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={npmlogo}
                  alt="npm"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Grab the easy to use npm package <a href="https://www.npmjs.com/package/@socialhose/casalytica">here</a>.
                  All it takes is a simple <pre>npm i @socialhose/casalytica</pre>

                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={code}
                  alt="code"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  {'Of course you can just opt to read the documentation and communicate with the endpoints directly. '}
                  {'The documentation is linked below.'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="https://api.casalytica.com/"
          sx={{ mt: 8 }}
        >
          API Docs
        </Button>
      </Container>
    </Box>
  );
}

export default SectionDownload;
