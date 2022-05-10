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
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Load from '../../Components/Load.js';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion, useAnimation } from "framer-motion";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import ProgressiveImg from '../../Components/ProgressiveImg'
import placeholderSrc from '../../placeholderSrc.png'

const list = {
  visible: {
    style: {
      y:200
    },
    opacity: 1,
    animate: {
      y: 0
    },
    transition: {
      duration: 0.8,
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

function otherDetail(pkmnValue, dataName){
  return(
    <>
    <Typography variant='' sx={{fontWeight:'medium'}}>
        {dataName}
    </Typography>
    <Typography sx={{fontSize:''}}>
        {pkmnValue}
    </Typography>
    </>
  )
}

function isBabyPkmn(pkmn){
if(pkmn['is_baby']){
  return(
    <Chip variant='outlined' color='primary' sx={{m:0.8, height:'25px', color:'primary', fontWeight:'medium'}}
      label='Baby'/>
    )
  }
}

function isMithLeng(pkmn){

  if(pkmn['is_legendary']){
    return (
      <Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium'}}
        label='Legendary'/>
    )
  }

  if(pkmn['is_mythical']){
    return (
      <Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium'}}
        label='Mythical'/>
    )
  }
}

const PresenterDashboard = ({pokemonResult, pkmnDetail , error, loading, imagen}) =>

loading ? <Load /> :
<ThemeProvider theme={changeTheme(pokemonResult['types']['0']['type']['name'])}>
<Card elevation={0} sx={{minWidth:'90%', m:0.5, border:2, borderColor:'primary.main'}} style={{borderRadius: '10px'}} key={pokemonResult.id}>
  <CardActionArea >
  <Link style={{ textDecoration: 'none' }} to={`/pokemon/${pokemonResult.id}`}>
    <Typography color='primary' component='div' sx={{display:'flex', flexDirection:'row-reverse', mr:1, mt:0.5, fontSize:12}}>
      {setZero(pokemonResult.id)}
    </Typography>

    {<ProgressiveImg src={pokemonResult['sprites']['other']['official-artwork']['front_default']} placeholderSrc={placeholderSrc} />}

    <Box color='primary'>
      <CardContent sx={{p:1, borderColor:'primary.main', bgcolor:'primary.main'}} >
        <Typography color='white' component='div' sx={{mt:0, mb:-3, fontSize:14}}>
          {capitalize(pokemonResult.name)}
        </Typography>
      </CardContent>
    </Box>
    </Link>
  </CardActionArea>
</Card>
</ThemeProvider>


export default PresenterDashboard;
