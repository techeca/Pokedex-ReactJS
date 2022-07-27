import React, { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CardActionArea, Card, Typography, Box } from '@mui/material'

import { Link } from 'react-router-dom'
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

import logo2 from 'images/logo2.png'
import logo3 from 'images/logo3.png'
import { capitalize, changeTheme, setZero, getIconType } from 'utils.js';
import { getDetailsPkmn } from 'Data/APIPkmn.js'

//Al obtner los datos generales de la
export default function MiniCardPokemon({p, mode}){
  const [simpleData, setSimpleData] = useState('')
  const [loading, setLoading] = useState(true)
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const initWeb = useCallback(() => {
      getDetailsPkmn(p.url).then((data) => setSimpleData(data))
  }, [p.url])

  useEffect(() => {
      initWeb()
      if(inView){
        controls.start('show')
      }
  }, [initWeb, inView, controls])

  const item = {
    hidden: { opacity: 0, y: 50, transition: { ease: [0.78, 0.14, 0.15, 0.86] }},
    show: { opacity: 1, y: 0, transition: { ease: [0.78, 0.14, 0.15, 0.86] }}
  };

  //Si hay datos y el icono de carga aún está en vista
  if(simpleData && loading){setLoading(false)}
  //console.log(simpleData)

  return(loading ? <></> :
    <ThemeProvider theme={changeTheme(simpleData['types']['0']['type']['name'])}>
      <motion.div variants={item} initial="show" animate={controls} ref={ref}>
        <Card elevation={0} sx={{m:0.5, border:2, borderColor:'primary.main', bgcolor:'#fff0', maxWidth:'180px', maxHeigth:'215px'}} style={{borderRadius: '10px'}} key={p.id}>
          <Link style={{ textDecoration: 'none' }} to={`/pokemon/${simpleData.id}`}>
            <CardActionArea>

            <Box sx={{display:'flex', ml:1, mt:1, justifyContent:'start', flexWrap:'wrap'}}>
              <Typography sx={{color:'primary.main', mr:''}}>{capitalize(simpleData.name)}</Typography>
              <Box sx={{ml:'-3px', mb:'-35px'}}>
                <Box sx={{display:'flex', flexDirection:'row', ml:0}}>
                  {simpleData.types.map((type, i) => <img key={i} alt='type' src={getIconType(type)} width={'15%'} style={{marginLeft:3, marginBottom:3}} />)}
                </Box>
              </Box>
            </Box>

            <Typography color='primary' sx={{display:'flex', justifyContent:'end', mt:'-10px', mr:0.5, fontSize:'6vw', fontWeight:'bold', opacity:0.3}}>
              {setZero(simpleData.id)}
            </Typography>


              <div style={{display:'flex', backgroundImage:`url(${mode === 'dark' ? logo2 : logo3})`, backgroundSize:'contain', margin:6, backgroundRepeat:'no-repeat', justifyContent:'center'}}>
                <img src={simpleData['sprites']['other']['official-artwork']['front_default']} width="100%" height="100%" alt={'pkmn'} style={{minWidth:'100px', minHeight:'100px'}}/>
              </div>

              <Box color='primary'>

              </Box>
            </CardActionArea>
          </Link>
        </Card>
      </motion.div>
    </ThemeProvider>
  )
};
