import { useState, useEffect, useCallback } from 'react'
import { Container, AppBar, Toolbar, Box, Avatar, Typography, IconButton, Menu, MenuItem, Checkbox } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { motion } from "framer-motion"
import { useParams, Link } from 'react-router-dom'
import { getPkmnByGen, getAllTypes } from 'Data/APIPkmn.js'

import { getPkmnGen, paginate, capitalize } from 'utils.js'
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [types, setTypes] = useState('');

  //const types = {types:{name:'Fire', selected:false}, {name: 'Water', selected:false},{name: 'Grass', selected:false},{name: 'Electric', selected:false},{name: 'Dragon', selected:false},{name: 'Rock', selected:false},{name: 'Ghost', selected:false}, {name: 'Psychic', selected:false}, {name:'Poison', selected:false},{name: 'Fighting', selected:false},{name: 'Ice', selected:false},{name: 'Fairy', selected:false},{name: 'Ground', selected:false},{name: 'Normal', selected:false},{name: 'Steel',selected:false},{name: 'Dark', selected:false},{name: 'Flying', selected:false}};

  //Obtiene generacion con detalles de pokemon, guarda todos los datos en simpleData
  //y los datos paginados en detailData (se obtiene detalles solo de pokemon paginados)
  const initWeb = useCallback(() => {
    getPkmnByGen(getPkmnGen(idgen)).then((data) => {
      //Obtiene todos los pokemon nombre y url
      setSimpleData(data)
      //Datos paginados //se puede borrar
      setDetailData(paginate(data.results, 18, 1))
    })
    if(!types){
      getAllTypes().then((data) => {
        let temp = data.results.map((t) => {return {type:t.name, selected:true}})
        setTypes(temp)
      })
    }
  }, [idgen, types])

  //console.log(types)
  function handleChangeType(e, i){
    let res = types.map((t) => {return {...t}})
    res.find(t => t.type === e.target.name).selected = e.target.checked;
    setTypes(res)
  }

  useEffect(() => {
    initWeb()
  }, [initWeb])
  //console.log(simpleData)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function allType(t, i){
    if(t.type !== 'unknown'){
      return(
          <MenuItem key={t.type} sx={{p:0, px:1, mb:-1}}>
            <Checkbox sx={{pt:0, pb:0, pl:0}} checked={t.selected} onChange={(e) => handleChangeType(e, i)} name={t.type} />
            <Typography sx={{fontSize:14}}>{capitalize(t.type)}</Typography>
          </MenuItem>
      )
    }
  }
  
  //Si hay datos e icono de carga aún está en vista
  if(simpleData && types && loading){setLoading(false)}

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
                      <IconButton aria-label='filtro' aria-haspopup="true" onClick={handleMenu}>
                        <FilterListIcon />
                      </IconButton>
                      <Menu sx={{mt:5}}
                        id="menu-appbar" anchorEl={anchorEl}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        keepMounted transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {types.map((t, i) =>
                          allType(t, i)
                        )}
                      </Menu>
                  </Box>
                  </Toolbar>
                    <motion.div style={{opacity:0}} animate={{opacity:1}} transition={{ ease: "easeOut", duration: 1 }}>
                      <SearchPkmn setInput={setInputText} />
                    </motion.div>
                </Container>
              </AppBar>
                <Box sx={{display:'flex', mt:1, justifyContent: 'center', flexWrap:'wrap'}}>
                  <ContentLoad simpleData={simpleData} detailData={detailData} setDetailData={setDetailData} inputText={inputText} page={page} setPage={setPage} mode={mode} types={types}/>
                </Box>
            </Container>
        )
}

export default Generacion;
