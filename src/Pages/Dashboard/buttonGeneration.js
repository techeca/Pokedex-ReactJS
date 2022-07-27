import { useState, useEffect, useCallback } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom';
import { capitalize, setImgStyle } from 'utils.js'

export default function ButtonGeneration({ g, getDet, theme, lang }){
  const [simpleData, setSimpleData] = useState('');
  const [isLoading, setIsLoading] = useState(true);

//Obtiene los detalles de la categoría entregada
//Más adelante podría crear panel que se expanda, muestre más detalles y
//un boton para ver lista de pkmn
  const initWeb = useCallback (() => {
    getDet(g.url).then((data) => setSimpleData(data));
  }, [g.url, getDet])

  useEffect(() => {
    initWeb()
  }, [initWeb])

//Obtiene el nombre de la generación según el idioma que se entrega
  function getLang(objGen, lang){
      return objGen.names.filter((name) => name.language.name === lang)
             .map((name) => name.name)
  }

//Si los datos están cargados e icono de carga aún en vista
  if(simpleData && isLoading){setIsLoading(false)}

  return ( isLoading ?<></> :

      <Paper variant='outlined' sx={{mt:2, textAlign:'left', bgcolor:'primary.main'}} style={setImgStyle(simpleData['main_region'].name)}>
        <Link style={{ textDecoration: 'none' }} to={`/generacion/${simpleData.id}`}>
          <Box sx={{display:'flex', p:1, flexDirection:'column'}}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
              <Typography variant={'h5'} sx={{color:'text.primary', fontSize:'1.10em', fontWeight:'Bold', mr:2}}>
                {getLang(simpleData, lang)}
              </Typography>
              <Typography sx={{color:'red', fontSize:'1.10em'}} style={{textShadow:'1px 1px 1px 1px black'}}>{simpleData.pokemon_species.length}</Typography>
            </Box>
            <Typography variant={'h5'} sx={{color:'text.primary', fontSize:'0.8em', fontWeight:'Bold', mt:-0.5}}>
              Moves: {simpleData.moves.length}
            </Typography>
            <Typography sx={{color:'text.primary'}}>
              {capitalize(simpleData['main_region'].name)}
            </Typography>
          </Box>
        </Link>
      </Paper>

  )
};
