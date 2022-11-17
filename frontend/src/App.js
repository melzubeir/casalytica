import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


import Header from './components/Header';
import Footer from './components/Footer';


const sections = [
  { title: 'About', url: '#' },
  { title: 'API', url: 'https://www.casalytica.com/api/docs/' },
  { title: 'Github', url: 'https://github.com/melzubeir/casalytica' },
  { title: 'Contact', url: 'https://diamondapp.com/user/casalytica' },
];

const theme = createTheme();


function App() {

  const accessLevel = useSelector(state => state.auth.accessLevel);

  return (
<ThemeProvider theme={theme}>
<CssBaseline />
<Container maxWidth="lg">
  <Header title="Casalytica" sections={sections}  />

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
