import React, { useState, useEffect, useCallback } from 'react'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'
import {Container, AppBar, Toolbar, Box, Avatar, Typography, IconButton, InputBase} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from "framer-motion";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams, Link } from 'react-router-dom'

import {getPkmnGen} from 'utils.js'
import MiniCardPokemon from './miniCardPokemon'
import Load from 'Components/Load.js'
import Poke from 'images/pokeball.png'

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
  })
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
  const [simpleData] = useState([])
  const [detailData, setDetailData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [inputText, setInputText] = useState('')
  const [page, setPage] = useState(1);
  const { idgen } = useParams();

  const inputHandler = (e) => {
      setInputText(e.target.value.toLowerCase())
      //console.log(inputText)
  };
  function SearchComponent(){
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
  const getSimpleData = useCallback(() => {
    if(simpleData.length === 0){
      return fetch(`https://pokeapi.co/api/v2/pokemon/?${getPkmnGen(idgen)}`)
      .then((res) => res.json())
        .then((res) => {
            simpleData.push(res)
            let data = res
            return data
          })
      .catch((err) => {setError(err)})
    }}, [idgen, simpleData])
  const activePage = useCallback(() => {
    setDetailData(detailData.concat(paginate(simpleData[0].results, 21, page)))
    setLoading(false)}, [detailData, page, simpleData])

  useEffect(() => {
    if(!simpleData.length){
      getSimpleData().then(() => activePage())
    }
  }, [simpleData.length, activePage, getSimpleData])

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
  }
  const fetchMoreData = (page) => {
    setPage(page + 1)
    setDetailData(detailData.concat(paginate(simpleData[0].results, 21, page + 1)))
  }
  function paginate(array, pageSize, pageNumber) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }
  function loadDashboard(){
    let tempData = []
    if(inputText !== ''){tempData = simpleData[0].results.filter((pkmn) => pkmn.name.includes(inputText))}

    if(tempData.length > 0){
      return(tempData.map((x, i) =>
        <Box key={i} sx={{maxWidth:'30%'}}>
          <MiniCardPokemon p={x} />
        </Box>
      ))
    }else {
      return(
        <InfiniteScroll dataLength={detailData.length} style={{overflow:'hidden'}}
          next={() => fetchMoreData(page)} hasMore={true} loader={<></>}>
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

  return(loading ? <Load /> :
          <ThemeProvider theme={defaultTheme}>
            <Container sx={{p:0, backgroundColor:'primary.main'}}>
              <AppBar elevation={0} position='static' sx={{border:0}}>
                <Container>
                  <Toolbar disableGutters>
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
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
              {SearchComponent()}
              </motion.div>
                <Box sx={{display:'flex', mt:1, justifyContent: 'center', flexWrap:'wrap'}}>
                  {loadDashboard()}
                </Box>
            </Container>
            </ThemeProvider>
        )
}

export default Generacion;
