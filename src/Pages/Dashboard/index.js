import React, { useState, useEffect, useCallback } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {Container, AppBar, Toolbar, Box, Avatar, Typography, Paper } from '@mui/material'
import { motion } from "framer-motion";
import ButtonGeneration from './buttonGeneration.js'
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
      text: {
      primary: 'rgba(0,0,0,0.87)',
      },
      background: {
        default: '#f7f7f7',
      },
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });

function Generacion(){
  const [simpleData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getSimpleData = useCallback(() => {
    if(simpleData.length === 0){
      return fetch(`https://pokeapi.co/api/v2/generation/`)
      .then((res) => res.json())
        .then((res) => {
            simpleData.push(res)
          })
      .catch((err) => {setError(err)})
    }
  }, [simpleData])

  useEffect(() => {
    if(!simpleData.length){
      getSimpleData().then(() => setLoading(false))
    }
  }, [getSimpleData, simpleData.length])

  if(error || !Array.isArray(simpleData)){
    return <p>Error...</p>
  }

  return(
    loading ? <Load /> :
          <ThemeProvider theme={defaultTheme}>
            <Container sx={{p:0, backgroundColor:'primary.main'}}>
              <AppBar elevation={0} position='static' sx={{border:0}}>
                <Container>
                  <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                      <motion.div style={{opacity:0}} animate={{opacity:1, rotate:360}} transition={{ duration: 1 }}>
                        <Avatar src={Poke} sx={{}}/>
                      </motion.div>
                      <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ duration: 1 }}>
                        <Typography variant='h5' sx={{ml:3, mt:0.5,fontWeight:'900', fontSize:'1.5rem'}}>
                         PokeApp
                        </Typography>
                      </motion.div>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
              <Box sx={{maxWidth:'95%', mb:2, mx:'auto', display:'flex', justifyContent:'flex-start'}}>
              </Box>
                  <Box sx={{display:'flex', justifyContent: 'center', flexWrap:'wrap'}}>
                    <Paper sx={{height:'90%', width:'90%', p:3}} variant='outlined'>
                      {simpleData[0].results.map((generation, i) =>
                        {return <ButtonGeneration key={i} g={generation} />}
                      )}
                    </Paper>
                  </Box>
            </Container>
            </ThemeProvider>
    )
  }

export default Generacion;
