import React, {useState, useEffect, useCallback} from 'react';
import Container from '@mui/material/Container';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import Poke from '../pokeball.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useInView } from "react-intersection-observer";
import {capitalize, changeTheme, setZero} from '../utils.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Load from '../Components/Load.js';
import ProgressiveImg from '../Components/ProgressiveImg'
import CircularProgress from '@mui/material/CircularProgress';
import placeholderSrc from '../placeholderSrc.png'
import LazyLoad from 'react-lazyload';
import InfiniteScroll from "react-infinite-scroll-component";
import { motion, useAnimation, LazyMotion, domAnimation, m } from "framer-motion";

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

//diseño personalizado segun pokemon
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

export default function MiniCardPokemon(p){
  const [simpleData, setSimpleData] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const pkmn = p.p
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const variants = {
  animate:{y:1, opacity:0.99},
  transition:{duration:1, when:'beforeChildren', staggerChildren: 0.3}
}
  //style={{ y:150, opacity:0 }} animate={{y:0, opacity:0.99}} transition={{duration:1}}



const getData = async () => {
    if(simpleData.length === 0){
      return fetch(pkmn.url)
      .then((res) => res.json())
        .then((res) => {
          //console.log(res)
          setSimpleData(res)
        })
      .catch((err) => {setError(err)})
    }
  }

  useEffect(() => {
      getData().then(() => setLoading(false))
      if(inView){
        controls.start('show')
      }
  }, [controls, inView])

  const item = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] }
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] }
  }
};

  return(

    loading ?
      <Box >

      </Box>
      :
      <motion.div variants={item} initial="hidden" animate={controls} ref={ref}>
    <ThemeProvider theme={changeTheme(simpleData['types']['0']['type']['name'])}>
    <Card elevation={0} sx={{maxWidth:'100%', m:0.5, border:2, borderColor:'primary.main'}} style={{borderRadius: '10px'}} key={pkmn.id}>
      <CardActionArea >
      <Link style={{ textDecoration: 'none' }} to={`/pokemon/${simpleData.id}`}>
        <Typography color='primary' component='div' sx={{display:'flex', flexDirection:'row-reverse', mr:1, mt:0.5, fontSize:12}}>
          {setZero(simpleData.id)}
        </Typography>

        {<ProgressiveImg src={simpleData['sprites']['other']['official-artwork']['front_default']} placeholderSrc={placeholderSrc} />}

        <Box color='primary'>
          <CardContent sx={{p:1, borderColor:'primary.main', bgcolor:'primary.main'}} >
            <Typography color='white' component='div' sx={{mt:0, mb:-3, fontSize:14}}>
              {capitalize(simpleData.name)}
            </Typography>
          </CardContent>
        </Box>
        </Link>
      </CardActionArea>
    </Card>
    </ThemeProvider>
    </motion.div >


  )

};
