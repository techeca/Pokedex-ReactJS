import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PokeTrans from '../../poketransw.png';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {capitalize, replaceChar, changeTheme, setZero} from '../../utils.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Load from '../../Components/Load.js';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion, useAnimation } from "framer-motion";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MiniCardPokemon from '../miniCardPokemon' ;
import { styled } from '@mui/material/styles';
import Poke from '../../pokeball.png';
import FilterListIcon from '@mui/icons-material/FilterList';

const defaultTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#f7f7f7',
      },
      secondary: {
        main: '#e0e0e0',
      },
      background: {
        default: '#f7f7f7',
      },
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
let pkmnBuscando = '';
const variants = {
visible: i => ({
  opacity: 1,
  y: 0,
  transition: {
    delay: i * 0.05,
  },
}),
hidden: { opacity: 0, y: 150 },
}


function SearchTest(){
  const [inputText, setInputText] = useState('')

  const inputHandler = (e) => {
      setInputText(e.target.value.toLowerCase())
      pkmnBuscando = e.target.value.toLowerCase();
      console.log(pkmnBuscando)
  };

  return(
  <Box sx={{display:'flex', justifyContent:'center'}}>
    <Box sx={{width:'90%', border:2, display:'flex', backgroundColor:'white', borderColor:'secondary.main'}} style={{borderRadius: '12px'}}>
      <Box sx={{width:'10%', mt:0.7}}>
        <SearchIcon color='' />
      </Box>
      <StyledInputBase sx={{width:'100%', mt:-0.3, ml:-5}}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => inputHandler(e) }
      />
    </Box>
  </Box>
)
}
function loadDashboard(pokemonResult){
let tempData = pokemonResult

  //console.log(pkmnBuscando.length)
  if(pkmnBuscando.length > 0){
    tempData = pokemonResult.results.filter((pkmn) => pkmn.name.includes(pkmnBuscando))
  }

  //let tempData = pokemonResult.results.filter((pkmn) => pkmn.name.includes(pkmnBuscando))


  if(Array.isArray(tempData) && tempData.length > 0){
    //simpleData[0].results.map((x) => console.log(x.url.replace('https://pokeapi.co/api/v2/pokemon/', '').slice(0, -1)))
    let count = 0
    return(
      <>
      {tempData.map((x, i) =>
        <Box key={i} sx={{maxWidth:'30%'}}>
          <MiniCardPokemon p={x} />
        </Box>
    )}
    </>
    )
  }else {
    console.log(pokemonResult)
    return(
      <>
      {pokemonResult.results.map((x, i) =>
        <Box key={i} sx={{maxWidth:'30%'}}>
          <motion.div custom={i} whileInView='visible' initial='hidden' viewport={{ once: true }} variants={variants}>
          <MiniCardPokemon  p={x} />
          </motion.div>
        </Box>
    )}
    </>
    )
  }


}

const PresenterGeneration = ({pokemonResult, error, loading}) =>

loading ? (<Load />) : (

    <ThemeProvider theme={defaultTheme}>
      <Container sx={{p:0, backgroundColor:'primary.main'}}>
        <AppBar elevation={0} position='static' sx={{border:0}}>
          <Container>
            <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <Avatar src={Poke} sx={{width:'7%', height:'7%'}}/>
              <Typography variant='h5' sx={{ml:2, fontWeight:'900', fontSize:'1.4rem'}}>
               Pokedex
              </Typography>
            </Box>
            <Box sx={{flexGrow:0}}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
            </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {SearchTest()}
        <Box sx={{maxWidth:'95%', mb:2, mx:'auto', display:'flex', justifyContent:'flex-start'}}>

        </Box>
            <Box sx={{display:'flex', justifyContent: 'center', flexWrap:'wrap'}}>
            {loadDashboard(pokemonResult)}
            </Box>
      </Container>
      </ThemeProvider>

)

export default PresenterGeneration
