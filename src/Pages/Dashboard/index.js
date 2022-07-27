import { useState, useEffect } from 'react'
import { Container, AppBar, Toolbar, Box, Avatar, Typography, Paper, FormControlLabel } from '@mui/material'
import { motion } from "framer-motion";
import ButtonGeneration from './buttonGeneration.js'
import Load from 'Components/Load.js'
import Poke from 'images/pokeball.png'
import { MaterialUISwitch } from 'Components/MUISwitch.js'
import { getCategorias, getDetailsGen } from 'Data/APIPkmn.js';

function Generacion({ lang, mode, changetheme }){
  const [simpleData, setSimpleData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modeWeb, setModeWeb] = useState(mode === 'dark' ? true : false); //Para switch mode

  //Obtiene generaciones (sin detalles) y las guarda en simpleData
  useEffect(() => {
    getCategorias().then((data) => setSimpleData(data));
  }, [])

  function handleChangeSwitch(e) {
    changetheme.local(mode === 'dark' ? 'light' : 'dark')
    changetheme.web(mode === 'dark' ? 'light' : 'dark')
    setModeWeb(e.target.checked)
  }

  //Si simpleData ya está cargado e icono de loading aún está en vista
  if(simpleData && isLoading){setIsLoading(false)}

  return ( isLoading ? <Load /> :
            <Container sx={{p:0, backgroundColor:'primary.main', minWidth:'100%'}}>

              {/*AppBar xD contiene icono y título 'PokeApp', animación en icono y título*/}
              <AppBar elevation={0} position='static' sx={{border:0, backgroundColor:'primary.main'}}>
                <Container sx={{}}>
                  <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                      {/*Animación e icono de pokebola*/}
                      <motion.div style={{opacity:0}} animate={{opacity:1, rotate:360}} transition={{ duration: 1 }}>
                        <Avatar alt='logo' src={Poke} sx={{height:'50px', width:'50px'}}/>
                      </motion.div>
                      {/*Título*/}
                      <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ duration: 1 }}>
                        <Typography variant='h5' sx={{ml:3, mt:1,fontWeight:'900', fontSize:'1.5rem'}}>
                         PokeApp
                        </Typography>
                      </motion.div>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'center', ml:3}}>
                      <FormControlLabel control={<MaterialUISwitch sx={{ m:2, mt:3 }} theme={mode} checked={modeWeb} onChange={(e) => handleChangeSwitch(e)} />} label="" />
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>

                  <Box sx={{display:'flex', justifyContent: 'center', flexWrap:'wrap', mt:1}}>
                    <Paper sx={{width:'90%', p:3}} variant='outlined'>
                    <Box sx={{pb:0, mx:'auto', display:'block', justifyContent:'flex-start', mt:0}}>
                      <Typography variant='h5'>Generations</Typography>
                      {simpleData.results.map((generation, i) =>
                        <ButtonGeneration key={i} g={generation} getDet={getDetailsGen} lang={lang} />
                      )}
                    </Box>

                    </Paper>
                  </Box>
            </Container>
          )
  }

export default Generacion;
