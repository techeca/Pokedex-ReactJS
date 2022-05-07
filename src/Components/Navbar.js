import React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, useParams } from 'react-router-dom';
import Dashboard from '../Dashboard/generacion'
import ContainerCard from '../Card/Cont'
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
        <Routes>
          <Route exact path='/' element={<Intro />} />
          <Route exact path='/pokeApp' element={<Dashboard/>} />
          <Route exact path='/generacion' element={<Dashboard/>} />
          <Route exact path='/pokemon/:idpkmn' element={<ContainerCard />} />
        </Routes>
    </ThemeProvider>
  );
}

export default Navbar;
