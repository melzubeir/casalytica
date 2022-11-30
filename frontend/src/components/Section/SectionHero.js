import * as React from 'react';
import Typography from '../UI/Typography';
import SectionHeroLayout from './SectionHeroLayout';

import Button from '../UI/Button';

const backgroundImage =
  'https://api.casalytica.com/static/images/0016.jpg?auto=format&fit=crop&w=1400';


export default function SectionHero() {
  return (
    <SectionHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        analytics for on-chain content
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        When your app shares impressions of on-chain content,
        we give you back the totality of all reported impressions so your users can learn their true reach.
      </Typography>
      <Button
              buttontext="Register"
              color="secondary"
              variant="contained"
              size="large"
              component="a"
              underline="none"
              href="/register"
              sx={{ minWidth: 200 }}
        >Register
      </Button>


      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Sharing is caring
      </Typography>
    </SectionHeroLayout>
  );
}
