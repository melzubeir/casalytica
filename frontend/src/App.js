import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import DesoApi from './libs/DesoApi'
import Header from './components/Header';
import Footer from './components/Footer';

import { authActions } from './store/reducers/auth';


const sections = [
  { title: 'About', url: '#' },
  { title: 'API', url: 'https://www.casalytica.com/api/docs/' },
  { title: 'Github', url: 'https://github.com/melzubeir/casalytica' },
  { title: 'Contact', url: 'https://diamondapp.com/user/casalytica' },
];


const theme = createTheme();
const deso = new DesoApi();

function App() {
  const dispatch = useDispatch();

  const accessLevel = useSelector(state => state.auth.accessLevel);
  const publicKey = useSelector(state => state.auth.publicKey);
  const isAuth = useSelector(state => state.auth.isAuthenticated);


  useEffect(() => {
    if (isAuth) {
      deso.getSingleProfile(publicKey)
        .then((response) => {
          dispatch(authActions.setProfile(response.Profile));
        })
    }
  }, [isAuth, publicKey, dispatch]);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Casalytica" sections={sections} />

        <main>
          Access Level: {accessLevel}
        </main>
      </Container>

      <Footer
        title='---'
        description="off-chain analytics for on-chain content"
      />
    </ThemeProvider>
  )

}

export default App;
