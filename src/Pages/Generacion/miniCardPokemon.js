import React, {useState, useEffect, useCallback} from 'react'
import { ThemeProvider } from '@mui/material/styles'
import {CardActionArea, Card, Typography, Box, CardContent} from '@mui/material'

import { Link } from 'react-router-dom'
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

import ProgressiveImg from 'Components/ProgressiveImg'
import placeholderSrc from 'images/placeholderSrc.png'
import {capitalize, changeTheme, setZero} from 'utils.js';

export default function MiniCardPokemon(p){
  const [simpleData, setSimpleData] = useState('')
  const [loading, setLoading] = useState(true)
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const pkmn = p.p

  const getData = useCallback (() => {

      return fetch(pkmn.url)
      .then((res) => res.json())
        .then((res) => {
          setSimpleData(res)
        })
      .catch((err) => {console.log(err)})
 
  }, [pkmn.url])

  useEffect(() => {
      getData().then(() => setLoading(false))
      if(inView){
        controls.start('show')
      }
  }, [controls, inView, getData])

  const item = {
    hidden: {opacity: 0, y: 50, transition: { ease: [0.78, 0.14, 0.15, 0.86] }},
    show: {opacity: 1, y: 0, transition: { ease: [0.78, 0.14, 0.15, 0.86] }}
  };

  return(loading ? <></> :
      <motion.div variants={item} initial="hidden" animate={controls} ref={ref}>
        <ThemeProvider theme={changeTheme(simpleData['types']['0']['type']['name'])}>
        <Card elevation={0} sx={{maxWidth:'100%', m:0.5, border:2, borderColor:'primary.main'}} style={{borderRadius: '10px'}} key={pkmn.id}>
          <CardActionArea >
          <Link style={{ textDecoration: 'none' }} to={`/pokemon/${simpleData.id}`}>
            <Typography color='primary' component='div' sx={{display:'flex', flexDirection:'row-reverse', mr:1, mt:0.5, fontSize:12}}>
              {setZero(simpleData.id)}
            </Typography>
            <ProgressiveImg src={simpleData['sprites']['other']['official-artwork']['front_default']} placeholderSrc={placeholderSrc} />
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
      </motion.div>
    )
};
