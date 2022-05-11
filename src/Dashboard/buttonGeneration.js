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
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Kanto from '../images/starters/kanto.png'
import Johto from '../images/starters/johto.png'
import Hoenn from '../images/starters/hoenn.png'
import Sinnoh from '../images/starters/sinnoh.png'
import Unova from '../images/starters/unova.png'
import Alola from '../images/starters/alola.png'
import Galar from '../images/starters/galar.png'
import Kalos from '../images/starters/kalos.png'

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

function setImgStyle(region){
  let tempRegion = Kanto
  let pathImg = `/Web/images/starters/${region}.png`
  //console.log(region)
  let Image = Kanto
  //console.log(styles.paperContainer)
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

export default function ButtonGeneration(g){
  const [simpleData, setSimpleData] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const generation = g.g
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const variants = {
  animate:{y:1, opacity:0.99},
  transition:{duration:1, when:'beforeChildren', staggerChildren: 0.3}
}
  //style={{ y:150, opacity:0 }} animate={{y:0, opacity:0.99}} transition={{duration:1}}

  const getData = async () => {
    if(simpleData.length === 0){
      return fetch(generation.url)
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
  hidden: {opacity: 0, y: 50, transition: { ease: [0.78, 0.14, 0.15, 0.86] }},
  show: {opacity: 1, y: 0, transition: { ease: [0.78, 0.14, 0.15, 0.86] }}
};

  return(
    loading ?
      <Box >
      </Box>
      :
      <motion.div variants={item} initial="hidden" animate={controls} ref={ref}>
      <Paper variant='outlined' sx={{mt:2, textAlign:'left'}} style={setImgStyle(simpleData['main_region'].name)}>
        <Link style={{ textDecoration: 'none' }} to={`/generacion/${simpleData.id}`}>
          <Box sx={{display:'flex', p:1, flexDirection:'column'}}>
          <Typography variant={'h5'} sx={{color:'text.primary', fontSize:'1.10em', fontWeight:'Bold'}}>
            {simpleData.names.map((name) => {if(name.language.name === 'en'){return name.name}})}
          </Typography>
          <Typography sx={{color:'text.primary'}}>
            {capitalize(simpleData['main_region'].name)}
          </Typography>
          </Box>
        </Link>
      </Paper>
      </motion.div >
  )
};
