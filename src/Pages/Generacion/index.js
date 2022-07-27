import { useState, useEffect, useCallback } from 'react'
import { Container, AppBar, Toolbar, Box, Avatar, Typography, IconButton } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { motion } from "framer-motion"
import { useParams, Link } from 'react-router-dom'
import { getPkmnByGen } from 'Data/APIPkmn.js'

import { getPkmnGen, paginate } from 'utils.js'
import SearchPkmn from './SearchPkmn'
import ContentLoad from './ContentLoad'
import Load from 'Components/Load.js'
import Poke from 'images/pokedex.png'

function Generacion({ mode }){
  const [simpleData, setSimpleData] = useState('')
  const [detailData, setDetailData] = useState('')
  const [loading, setLoading] = useState(true)
  const [inputText, setInputText] = useState('')
  const [page, setPage] = useState(1);
  const { idgen } = useParams();

  //Obtiene generacion con detalles de pokemon, guarda todos los datos en simpleData
  //y los datos paginados en detailData (se obtiene detalles solo de pokemon paginados)
  const initWeb = useCallback(() => {
    getPkmnByGen(getPkmnGen(idgen)).then((data) => {
      setSimpleData(data)
      setDetailData(paginate(data.results, 18, 1))
    });
  }, [idgen])

  useEffect(() => {
    initWeb()
  }, [initWeb])
  //console.log(simpleData)

  //Si hay datos e icono de carga aún está en vista
  if(simpleData && loading){setLoading(false)}

  return (loading ? <Load /> :
            <Container sx={{p:0, backgroundColor:'primary.main', minWidth:'100%'}}>
              <AppBar elevation={0} position='static' sx={{border:0, backgroundColor:'primary.main', display: { xs: 'block'}, mb:0, pt:0.8 }}>
                <Container>
                  <Toolbar disableGutters>
                  <Box sx={{ flexGrow: 1, display:'flex'}}>
                  <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ duration: 1 }}>
                    <Avatar variant='square' alt='pokedex' src={Poke} sx={{height:'51px', width:'35px', mb:0.8, ml:1}}/>
                  </motion.div>
                  <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeOut", duration: 1 }}>
                    <Link style={{ textDecoration: 'none' }} to={`/pokeApp`}>
                      <Typography variant='h5' sx={{ml:3, mt:1, fontWeight:'900', fontSize:'1.5rem', color:'text.primary'}}>
                        Pokedex
                      </Typography>
                    </Link >
                    </motion.div>
                  </Box>
                  <Box sx={{flexGrow:0}}>
                      <IconButton aria-label='filtro'>
                        <FilterListIcon />
                      </IconButton>
                  </Box>
                  </Toolbar>
                    <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeOut", duration: 1 }}>
                      <SearchPkmn setInput={setInputText} />
                    </motion.div>
                </Container>
              </AppBar>
                <Box sx={{display:'flex', mt:1, justifyContent: 'center', flexWrap:'wrap'}}>
                  <ContentLoad simpleData={simpleData} detailData={detailData} setDetailData={setDetailData} inputText={inputText} page={page} setPage={setPage} mode={mode}/>
                </Box>
            </Container>
        )
}

export default Generacion;
