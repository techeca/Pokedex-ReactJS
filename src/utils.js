import { createTheme } from '@mui/material/styles';

import Kanto from 'images/starters/kanto.png'
import Johto from 'images/starters/johto.png'
import Hoenn from 'images/starters/hoenn.png'
import Sinnoh from 'images/starters/sinnoh.png'
import Unova from 'images/starters/unova.png'
import Alola from 'images/starters/alola.png'
import Galar from 'images/starters/galar.png'
import Kalos from 'images/starters/kalos.png'
import "@fontsource/poppins"
//Funciones Re-utilizables

//Primera letra con mayusculas igual que textTransform
export function capitalize(word){
  return word[0].toUpperCase() + word.slice(1);
}

export function replaceChar(strBase, txtChang, txtNew){
  return strBase.replace(`${txtChang}`, `${txtNew}`);
}

export function hide (elements){
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

export function checkType(type){
  if(type === 1){
    return 'primary';
  }
  if(type === 2){
    return 'secondary';
  }
}

export function getPkmnGen(idgen){
  let tempLimite = ''
  if(idgen === '1'){tempLimite = 'limit=151'}
  if(idgen === '2'){tempLimite = 'limit=100&offset=151'}
  if(idgen === '3'){tempLimite = 'limit=135&offset=251'}
  if(idgen === '4'){tempLimite = 'limit=107&offset=386'}
  if(idgen === '5'){tempLimite = 'limit=155&offset=494'}
  if(idgen === '6'){tempLimite = 'limit=72&offset=649'}
  if(idgen === '7'){tempLimite = 'limit=88&offset=721'}
  if(idgen === '8'){tempLimite = 'limit=89&offset=809'}

  return tempLimite
}

export function setZero(numberpkmn){
  if(numberpkmn < 10){return `#00${numberpkmn}`;}
  if(numberpkmn > 9 && numberpkmn < 100){return `#0${numberpkmn}`;}
  if(numberpkmn > 99){return `#${numberpkmn}`;}
}

export function setImgStyle(region){
  let Image = Kanto
  if(region === 'kanto'){Image = Kanto}
  else if(region === 'johto'){Image = Johto}
  else if(region === 'hoenn'){Image = Hoenn}
  else if(region === 'sinnoh'){Image = Sinnoh}
  else if(region === 'unova'){Image = Unova}
  else if(region === 'kalos'){Image = Kalos}
  else if(region === 'alola'){Image = Alola}
  else if(region === 'galar'){Image = Galar}

  const styles = {
      paperContainer: {
          backgroundImage: `url(${Image})`,
          width:'100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'right'
      }
  }

  return styles.paperContainer
}

const grassTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#74cb48',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#74cb48',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const fireTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F57D31',
    },
    secondary: {
      main: '#A891EC',
    },
    background: {
      default: '#F57D31',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const waterTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6493EB',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#6493EB',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const bugTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A7B723',
    },
    secondary: {
      main: '#A891EC',
    },
    background: {
      default: '#A7B723',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const normalTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#AAA67F',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#AAA67F',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const poisonTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a43e9e',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#a43e9e',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const electricTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f9cf30',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#f9cf30',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const groundTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#dec16b',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#dec16b',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const ghostTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#70559b',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#70559b',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const fightingTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c12239',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#c12239',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const psychicTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fb5584',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#fb5584',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const rockTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B69e31',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#B69e31',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const iceTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9ad6df',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#9ad6df',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const dragonTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7037ff',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#7037ff',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const fairyTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e69eac',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#e69eac',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const flyingTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A891EC',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#a891ec',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#666666',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#666666',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});
const steelTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b7b9d0',
    },
    secondary: {
      main: '#a43e9e',
    },
    background: {
      default: '#b7b9d0',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export function changeTheme(typepkmn){
  if(typepkmn === 'grass' || typepkmn === 'Grass'){return grassTheme;}
  if(typepkmn === 'fire' || typepkmn === 'Fire'){return fireTheme;}
  if(typepkmn === 'water' || typepkmn === 'Water'){return waterTheme;}
  if(typepkmn === 'bug' || typepkmn === 'Bug'){return bugTheme;}
  if(typepkmn === 'normal' || typepkmn === 'Normal'){return normalTheme;}
  if(typepkmn === 'poison' || typepkmn === 'Poison'){return poisonTheme;}
  if(typepkmn === 'electric' || typepkmn === 'Electric'){return electricTheme;}
  if(typepkmn === 'ground' || typepkmn === 'Ground'){return groundTheme;}
  if(typepkmn === 'ghost' || typepkmn === 'Ghost'){return ghostTheme;}
  if(typepkmn === 'fighting' || typepkmn === 'Fighting'){return fightingTheme;}
  if(typepkmn === 'psychic' || typepkmn === 'Psychic'){return psychicTheme;}
  if(typepkmn === 'rock' || typepkmn === 'Rock'){return rockTheme;}
  if(typepkmn === 'ice' || typepkmn === 'Ice'){return iceTheme;}
  if(typepkmn === 'dragon' || typepkmn === 'Dragon'){return dragonTheme;}
  if(typepkmn === 'flying' || typepkmn === 'Flying'){return flyingTheme;}
  if(typepkmn === 'fairy' || typepkmn === 'Fairy'){return fairyTheme;}
  if(typepkmn === 'dark' || typepkmn === 'Dark'){return darkTheme;}
  if(typepkmn === 'steel' || typepkmn === 'Steel'){return steelTheme;}
}
