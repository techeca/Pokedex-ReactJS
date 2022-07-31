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
export default function MiniCardPokemon({p, mode, typeFilter}){
  const [simpleData, setSimpleData] = useState('')
  const [loading, setLoading] = useState(true)
  //const [filterByUser, setFilterByUser] = useState(false)
  const controls = useAnimation();
  const [ref, inView] = useInView();
  //let tempType = typeFilter.find((ts) => ts.type === simpleData.types.map((t) => t.type.name)) ? true : false

  const initWeb = useCallback(() => {
      getDetailsPkmn(p.url).then((data) => {
        setSimpleData(data)
        //setFilterByUser(checkTypeSel(data))
      })
  }, [p.url])

  useEffect(() => {
      initWeb()
      if(inView){
        controls.start('show')
      }
  }, [initWeb, inView, controls])

  function checkTypeSel(typesObj){
  let tempStatus = true;
  //Obtiene todos los tipos desmarcados
  let typesUnselected = typeFilter.filter((t) => t.selected === false)

  if(typesUnselected.length > 0){
    typesUnselected.forEach((item, i) => {
      //console.log(item.type)
      typesObj.types.forEach((tp, i) => {
          if(item.type === tp.type.name){
            tempStatus = false
          }
      });
    });
   }
    return tempStatus
  }

  const item = {
    hidden: { opacity: 0, y: 50, transition: { ease: [0.78, 0.14, 0.15, 0.86] }},
    show: { opacity: 1, y: 0, transition: { ease: [0.78, 0.14, 0.15, 0.86] }}
  };

  //Si hay datos y el icono de carga aún está en vista
  if(simpleData && loading){setLoading(false)}

  //console.log(filterByUser)

  return(loading ? <></> :
    <ThemeProvider theme={changeTheme(simpleData['types']['0']['type']['name'])}>
      <motion.div variants={item} initial="show" animate={controls} ref={ref}>
        <Card elevation={0} sx={{display:checkTypeSel(simpleData) ? '' : 'none' , m:0.5, border:2, borderColor:'primary.main', bgcolor:'#fff0', maxWidth:'180px', maxHeigth:'215px'}} style={{borderRadius: '10px'}} key={p.id}>
          <Link style={{ textDecoration: 'none' }} to={`/pokemon/${simpleData.id}`}>
            <CardActionArea>

            {/*Nombre de pokemon*/}
            <Box sx={{display:'flex', ml:1, mt:1, justifyContent:'start', flexWrap:'wrap'}}>
              <Typography sx={{color:'primary.main', mr:''}}>{capitalize(simpleData.name).replace('-', ' ')}</Typography>
              <Box sx={{ml:'-3px', mb:'-35px'}}>
                {/*Iconos de tipos*/}
                <Box sx={{display:'flex', flexDirection:'row', ml:0}}>
                  {simpleData.types.map((type, i) => <img key={i} alt='type' src={getIconType(type)} width={'15%'} style={{marginLeft:3, marginBottom:3}} />)}
                </Box>
              </Box>
            </Box>

            {/*Número de pokemon*/}
            <Typography color='primary' sx={{display:'flex', justifyContent:'end', mt:'-10px', mr:0.5, fontSize:'6vw', fontWeight:'bold', opacity:0.3}}>
              {setZero(simpleData.id)}
            </Typography>

            {/*Imagen de pokemon*/}
              <div style={{display:'flex', backgroundImage:`url(${mode === 'dark' ? logo2 : logo3})`, backgroundSize:'contain', margin:6, backgroundRepeat:'no-repeat', justifyContent:'center'}}>
                <img src={simpleData['sprites']['other']['official-artwork']['front_default']} width="100%" height="100%" alt={'pkmn'} style={{minWidth:'100px', minHeight:'100px'}}/>
              </div>

              <Box color='primary'>
                {/*Aquí estaba el nombre R.I.P*/}
              </Box>
            </CardActionArea>
          </Link>
        </Card>
      </motion.div>
    </ThemeProvider>
  )

};
