import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Route } from 'react-router-dom';

import DesoApi from './libs/DesoApi'
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';

import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';

import { authActions } from './store/reducers/auth';


const sections = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'API', url: 'https://www.casalytica.com/api/docs/' },
  { title: 'Github', url: 'https://github.com/melzubeir/casalytica' },
  { title: 'Contact', url: '/contact' },
];


const theme = createTheme();
const deso = new DesoApi();

function App() {
  const dispatch = useDispatch();

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

    <div>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Casalytica" sections={sections} />

          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/contact'>
            <Contact />
          </Route>
        </Container>
        <Footer
          title='---'
          description="off-chain analytics for on-chain content"
        />
      </ThemeProvider>

    </div>
  )

}

export default App;
