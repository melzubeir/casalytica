import React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Deso } from 'deso-protocol';
import Button from '@mui/material/Button';

import Header from './components/Header';
import Footer from './components/Footer';


const sections = [
  { title: 'About', url: '#' },
  { title: 'API', url: 'https://www.casalytica.com/api/docs/' },
  { title: 'Github', url: 'https://github.com/melzubeir/casalytica' },
  { title: 'Contact', url: 'https://diamondapp.com/user/casalytica' },
];

const theme = createTheme();
const deso = new Deso();

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async () => {
      const user = await deso.identity.login(4);
      setPublicKey(user.key);
      setLoggedIn(true);

      setUserInfo(await deso.user.getSingleProfile(user.key));
  };



  return (
<ThemeProvider theme={theme}>
<CssBaseline />
<Container maxWidth="lg">
  <Header title="Casalytica" sections={sections} isLoggedIn={isLoggedIn} publicKey={publicKey} />
  <Button variant={ isLoggedIn ? "outlined" : "contained" } size="small"
        onClick={handleLogin}
        >
          { isLoggedIn ? 'Aigh Chill!' : 'Login' }
  </Button>
  </Container>
  <Footer
    title='---'
    description="off-chain analytics for on-chain content"
  />
</ThemeProvider>
)

}

export default App;
