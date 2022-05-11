import React, {useState, useEffect, useCallback} from 'react'
import {Paper, Typography, Box} from '@mui/material'

import { Link } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import {capitalize, setImgStyle} from 'utils.js'

export default function ButtonGeneration(g){
  const [simpleData, setSimpleData] = useState('')
  const [loading, setLoading] = useState(true)
  const generation = g.g
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const getData = useCallback(() => {
      return fetch(generation.url)
      .then((res) => res.json())
        .then((res) => {
          setSimpleData(res)
        })
      .catch((err) => {console.log(err)})

  }, [generation.url])
 
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

  return(loading ?<Box></Box> :
      <motion.div variants={item} initial="hidden" animate={controls} ref={ref}>
      <Paper variant='outlined' sx={{mt:2, textAlign:'left'}} style={setImgStyle(simpleData['main_region'].name)}>
        <Link style={{ textDecoration: 'none' }} to={`/generacion/${simpleData.id}`}>
          <Box sx={{display:'flex', p:1, flexDirection:'column'}}>
          <Typography variant={'h5'} sx={{color:'text.primary', fontSize:'1.10em', fontWeight:'Bold'}}>
            {simpleData.names.map((name) => {if(name.language.name === 'en'){return name.name}else {
              return <></>
            }})}
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
