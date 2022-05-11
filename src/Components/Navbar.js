import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from 'Pages/Generacion/'
import PokeApp from 'Pages/Dashboard/'
import ContainerCard from 'Pages/CardPokemon/'
import Intro from '../intro.js';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(63,81,181,0)',
      light: '#ffffff',
      contrastText: '#5c5c5c',
    },
    secondary: {
      main: '#d32f2f',
    },
    success: {
      main: '#4caf50',
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#d32f2f',
    },
  },
});

const Navbar = () => {
  return(
    <ThemeProvider theme={lightTheme}>
    <BrowserRouter basename='/Pokedex-ReactJS'>
        <Routes>
          <Route exact path='/' element={<Intro />} />
          <Route exact path='/pokeApp' element={<PokeApp/>} />
          <Route exact path='/generacion/:idgen' element={<Dashboard/>} />
          <Route exact path='/pokemon/:idpkmn' element={<ContainerCard/>} />
        </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default Navbar;
