import React, { useState, useEffect } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Poke from 'images/pokeball.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import Load from '../Components/Load.js';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { motion, useAnimation, useViewportScroll, LazyMotion, domAnimation, m } from "framer-motion";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams, Link } from 'react-router-dom'

import MiniCardPokemon from './miniCardPokemon';
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
  const [page, setPage] = useState(1);
  const { idgen } = useParams();
  let pkmnBuscando = '';

  const inputHandler = (e) => {
      setInputText(e.target.value.toLowerCase())
      pkmnBuscando = e.target.value.toLowerCase();
      //console.log(inputText)
  };

  //Request de info
  const getSimpleData = async () => {
    let tempLimite = ''
    if(idgen === '1'){tempLimite = 'limit=151'}
    if(idgen === '2'){tempLimite = 'limit=100&offset=151'}
    if(idgen === '3'){tempLimite = 'limit=135&offset=251'}
    if(idgen === '4'){tempLimite = 'limit=107&offset=386'}
    if(idgen === '5'){tempLimite = 'limit=155&offset=494'}
    if(idgen === '6'){tempLimite = 'limit=72&offset=649'}
    if(idgen === '7'){tempLimite = 'limit=88&offset=721'}
    if(idgen === '8'){tempLimite = 'limit=89&offset=809'}
    if(simpleData.length === 0){
      return fetch(`https://pokeapi.co/api/v2/pokemon/?${tempLimite}`)
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
      setDetailData(detailData.concat(paginate(simpleData[0].results, 21, page)))
      setLoading(false)
      //console.log('time out')
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'center',
      transition: {
        staggerChildren: 0.5
      }
    }
  };
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
  //Paginación
  function paginate(array, pageSize, pageNumber) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }

  const fetchMoreData = (page: number) => {
    setPage(page + 1)
    setDetailData(detailData.concat(paginate(simpleData[0].results, 21, page + 1)))
    //return(page)
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
        <InfiniteScroll dataLength={detailData.length}
          style={{overflow:'hidden'}}
          next={() => fetchMoreData(page)} hasMore={true}
          loader={<></>}>
          <motion.div initial='hidden' animate='show' variants={container}>
            {detailData.map((x, i) =>
                 <Box sx={{maxWidth:'30%'}} key={i}>
                   <MiniCardPokemon p={x} />
                 </Box>
              )}
          </motion.div>
        </InfiniteScroll>
      )
    }

  }

  if(error || !Array.isArray(simpleData) || !Array.isArray(detailData)){
    return <p>Error...</p>
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
                  <motion.div style={{opacity:0}} animate={{opacity:1, rotate:360}}
                    transition={{ duration: 1 }}>
                    <Avatar src={Poke} sx={{}}/>
                  </motion.div>
                  <motion.div style={{opacity:0}} animate={{opacity:1}}
                    transition={{ ease: "easeOut", duration: 1 }}>
                    <Link style={{ textDecoration: 'none' }} to={`/pokeApp`}>
                    <Typography variant='h5' sx={{ml:3, mt:0.5, fontWeight:'900', fontSize:'1.5rem', color:'text.primary'}}>
                     Pokedex
                    </Typography>
                    </Link >
                    </motion.div>
                  </Box>
                  <Box sx={{flexGrow:0}}>
                      <IconButton>
                        <FilterListIcon />
                      </IconButton>
                  </Box>
                  </Toolbar>
                </Container>
              </AppBar>
              <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeOut", duration: 1 }}>
              {SearchTest()}
              </motion.div>
              <Box sx={{maxWidth:'95%', mb:2, mx:'auto', display:'flex', justifyContent:'flex-start'}}>

              </Box>
                  <Box sx={{display:'flex', justifyContent: 'center', flexWrap:'wrap'}}>
                  {loadDashboard()}
                  </Box>
            </Container>
            </ThemeProvider>
        }
    </>
  )
}

export default Generacion;
