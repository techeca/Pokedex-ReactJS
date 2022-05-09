import React, { useState, useEffect } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Poke from '../pokeball.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import Load from '../Components/Load.js';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { motion, useAnimation, useViewportScroll, LazyMotion, domAnimation, m } from "framer-motion";

import MiniCardPokemon from './miniCardPokemon' ;
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

function Generacion(){
  const [simpleData, setSimpleData] = useState([])
  const [detailData, setDetailData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingDash, setLoadingDash] = useState(true)
  const [error, setError] = useState('')
  const [inputText, setInputText] = useState('')
  let pkmnBuscando = '';

  const inputHandler = (e) => {
      setInputText(e.target.value.toLowerCase())
      pkmnBuscando = e.target.value.toLowerCase();
      console.log(inputText)
  };

  //Request de info
  const getSimpleData = async () => {
    if(simpleData.length === 0){
      return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then((res) => res.json())
        .then((res) => {
            simpleData.push(res)
            let data = res
            //console.log(data.results)
            //setLoadingDash(false)
            return data
            //console.log(detailData)
          })
      .catch((err) => {setError(err)})
    }
  }
  const getDetailData = async () => {
    let tempData = detailData
    simpleData[0].results.forEach((pkmn) => {
      let tmpURL = pkmn.url
      return fetch(`${tmpURL}`)
      .then((res) => res.json())
        .then((res) => {
          tempData.push(res)
          let tempPkmn = res

        })
        .catch((err) => {setError(err)})
    })
    //detailData.push(tempDetailData)
    //console.log('caca')
    setDetailData(tempData)
  }
  function SearchTest(){
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
  function activePage(){
    setLoading(true)
    setLoadingDash(false)
    setTimeout(() => {
      setLoading(false)
      console.log('time out')
    }, 500)

  }

  const loadFeatures = import("../features.js")
  .then(res => res.default)

  function cargarLista(){
    //console.log(x)
    const temp = detailData

    if(simpleData.length > 0){
      const list = {
          visible: {
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.3,
            },
          },
          hidden: {
            opacity: 0,
            transition: {
              when: "afterChildren",
            },
          },
        }
      //console.log(simpleData[0].results)
      //<ul key={x.name}>{x.name}</ul>
      //console.log(detailData)
      //console.log('datos cargados')
      return(

      detailData.map((x) =>

          <MiniCardPokemon p={x} />

        ))
    }else {
      //console.log('datos no cargados')
    }
  }

  useEffect(() => {
    //getSimpleData()
    //setLoading(false)
    if(!simpleData.length){
      getSimpleData().then(() => activePage())
    }
    //console.log(detailData)
  }, [])

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

  function loadDashboard(){
    let tempData = []

    if(inputText !== ''){

      tempData = simpleData[0].results.filter((pkmn) => pkmn.name.includes(inputText))
    }

    if(tempData.length > 0){
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
      return(
        <>
        {simpleData[0].results.map((x, i) =>
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

  if(error || !Array.isArray(simpleData) || !Array.isArray(detailData)){
    return <p>Error de puta madre</p>
  }

  return(
    <>
        {loading ? <Load /> :
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
                  {loadingDash ? <Load /> : loadDashboard()}
                  </Box>
            </Container>
            </ThemeProvider>
        }
    </>
  )
}

export default Generacion;
