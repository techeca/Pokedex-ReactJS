import { createTheme } from '@mui/material/styles'

//Retorna el tema dependiendo del modo (dark o light)
export function getTheme(mode){
  return mode === 'dark' ? darkTheme : defaultTheme
}

 const defaultTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#f7f7f7',
      },
      secondary: {
        main: '#e0e0e0',
      },
      text: {
      primary: 'rgba(0,0,0,0.87)',
      },
      background: {
        default: '#f7f7f7',
      },
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });

 const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#262626',
        },
        secondary: {
          main: '#565656',
        },
        text: {
        primary: 'rgba(240,240,240,0.87)',
        },
        background: {
          default: '#f7f7f7',
        },
      },
      typography: {
        fontFamily: 'Poppins',
      },
    });
