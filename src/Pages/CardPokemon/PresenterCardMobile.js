import { Container, Paper, AppBar, Toolbar, Box, Typography, Avatar, IconButton, Chip, Grid, Divider, ThemeProvider, Slide } from '@mui/material'
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { capitalize, replaceChar, changeTheme, setZero, getIdFromGen } from 'utils.js'
import { motion } from "framer-motion"
import Load from 'Components/Load.js'
import logo2 from 'images/logo2.png'
import logo3 from 'images/logo3.png'
import { Link } from 'react-router-dom'

function otherDetail(pkmnValue, dataName, lang, mode){
  return(<>
    <Typography variant='' sx={{fontWeight:'medium', color:'primary.main'}}>
        {dataName}
    </Typography>
    <Typography sx={{fontSize:'', color:mode === 'light' ? 'text.primary' : 'text.secondary', mt:1}}>
        {pkmnValue}
    </Typography>
    </>)
}

function isBabyPkmn(pkmn){
if(pkmn['is_baby']){return(<Chip variant='outlined' color='primary' sx={{m:0.8, height:'25px', color:'primary', fontWeight:'medium', zIndex:1}} label='Baby'/>)}}
function isMithLeng(pkmn){
  if(pkmn['is_legendary']){return (<Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium', zIndex:1}} label='Legendary'/>)}
  if(pkmn['is_mythical']){return (<Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium', zIndex:1}} label='Mythical'/>
    )
  }
}

function statsString(stat){
  return (
   <Box sx={{pb:1}}>
     <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold'}}>{stat}</Typography>
   </Box>
 )
}

//Obtiene la descripción del pokemon según su idioma
function getFlavorText(objPkmn, lang, mode){
  return (objPkmn.filter((text) => text.language.name === lang)
    .map((text) => text.flavor_text))
}

const PresenterDashboard = ({pokemonResult, pkmnDetail, loading, lang, mode}) =>

  loading ? (<Load />) : (
  <motion.div style={{ opacity:0, overflow:'hidden'}} animate={{opacity:1}} transition={{duration:1}}>

    <Container  maxWidth='lg' sx={{width:'100%', height:'100%', bgcolor:'primary.main', maxWidth:'599px'}}>
        <AppBar elevation={0} position='static' sx={{bgcolor:'primary.main'}}>
          <Container>
            {/*Back button, nombre de pokemon y numero de pokedex*/}

            <ThemeProvider theme={changeTheme(pokemonResult['types'][0].type.name)}>
            <Toolbar disableGutters>
            {/*Back button (malo, deberñia devolver a la lista de pokemon, si se cambia de pokemon vuelve al pokemon al que estaba)*/}
            {/* y Nombre de pokemon*/}
              <Box  sx={{flexGrow: 1, display: {xs: 'flex'}}}>
                <Link style={{ textDecoration: 'none' }} to={`/generacion/${getIdFromGen(pkmnDetail.generation.name).numero}`}>
                  <IconButton aria-label='backbtn' sx={{ml:-3}}>
                    <ArrowBackIosNewOutlinedIcon sx={{color:'primary.main'}} />
                  </IconButton>
                </Link>
                {/*Nombre de pokemon*/}
                <Typography color='primary.main' variant='h5' sx={{ml:2, fontWeight:'Bold', mt:0.5}}>
                 {capitalize(pokemonResult.name).replace('-', ' ')}
                </Typography>
              </Box>
              {/*Numero de pokemon*/}
              <Box sx={{flexGrow:0, color:'primary.main'}}>
                  <Typography sx={{fontWeight:'Bold', opacity:0.6}}>{setZero(pokemonResult.id)}</Typography>
              </Box>
            </Toolbar>
            {/*</ThemeProvider>*/}

            {/*Etiqueta (chip) de generación*/}
            <Box sx={{display:'flex'}}>
              <Box sx={{border:0, color:'white', borderRadius:5, pl:1.3, pr:1.3, pt:0, pb:0.5, bgcolor:'text.primary'}}>
                <Typography variant='' sx={{fontSize:'0.80em'}}>
                    {/*capitalize(pkmnDetail.generation.name.replace('-', ' '))*/}
                    GEN {getIdFromGen(pkmnDetail.generation.name).romano}
                </Typography>
              </Box>

            </Box>
            {/*Etiqueta (chip) de baby, legendary, myth, etc*/}
            <Box sx={{mt:'5px', display:'flex', justifyContent:'start', mb:'-80px'}}>
              {isBabyPkmn(pkmnDetail)}
                {pokemonResult['types'].map((type) =>
                <ThemeProvider key={type.type.name} theme={changeTheme(type['type']['name'])}>
                <Chip color='primary' sx={{m:0.8, height:'25px', color:'white', fontWeight:'medium', zIndex:1}}
                  label={capitalize(type.type.name)}/>
                </ThemeProvider>
                )}
              {isMithLeng(pkmnDetail)}
            </Box>

            {/*Cambiar pokemon a la izquierda*/}
            {/*Nombre Pokemon, numero e imagen de fondo (pokeball)*/}
            {/*Cambiar pokemon a la derecha*/}
            <Box sx={{width:'100%', display:'flex', flexWrap:'nowrap', justifyContent:''}}>
                {/*Botón para cambiar pokemon (atras)*/}
                <Box sx={{display:'flex', mt:'50%', ml:-3, flexWrap:'', width:'10%', height:'10%'}}>
                  <IconButton href={pokemonResult.id === 1 ? `./151` : `./${pokemonResult.id-1}`} sx={{}}>
                    <ArrowBackIosIcon sx={{color:'primary.main'}} />
                  </IconButton>
                </Box>

                {/*Fondo pokemon (pokeball transparente)*/}
                <Box sx={{display:'flex' ,justifyContent:'', flexWrap:'', width:'100%'}}>
                  <Avatar src={mode === 'light' ? logo3 : logo2} sx={{mt:2, mb:2, opacity:1, width:'100%', height:'auto', zIndex:0}} />
                </Box>

                {/*Botón para cambiar pokemon (adelante)*/}
                <Box sx={{display:{lg:'none'}, mt:'50%', mr:-3, flexWrap:'', width:'10%', height:'10%'}}>
                  <IconButton href={`./${pokemonResult.id+1}`} sx={{}}>
                    <ArrowForwardIosIcon sx={{color:'primary.main'}} />
                  </IconButton>
                </Box>
            </Box>

            <Box >
              {/*Imagen pokemon*/}
              <Box sx={{mt:'-90%', mb:'15%', mx:'auto', display:'flex', flexwrap: 'nowrap', justifyContent:'center'}}>
              <motion.div style={{ y:150, opacity:0, width:'80%'}} animate={{y:0, opacity:0.99}} transition={{duration:1}}>
                  <Box>

                  <img alt={pokemonResult.name} src={pokemonResult['sprites']['other']['official-artwork']['front_default']} width='100%' height='auto' sx={{minWidth:340}}/>
                  </Box>
              </motion.div>
              </Box>

              {/*Tarjeta con detalles*/}
              {/*}<ThemeProvider theme={changeTheme(pokemonResult['types'][0].type.name)}>*/}
            <Box sx={{width:'100%', height:'auto'}}>
              <Slide direction='up' in={true} timeout={0}>
                <Paper elevation={0} sx={{border:3, m:-3, borderRadius:'10px', borderColor:`primary.main`, mb:1, bgcolor:'#fff0'}}>

                {/*aqui estaban chips (tipos, Legendary, mith, baby)*/}

                {/*Título About*/}
                <Typography variant='h6' color='primary' sx={{m:2, fontWeight:'Bold'}}>About</Typography>

                {/*Peso, altura y habilidades*/}
                <Box sx={{maxWidth:'100%'}}>
                  <Grid container >

                    {/*Peso de pokemon*/}
                    <Grid item xs>
                      <Box sx={{display:'flex', justifyContent:'center', mt:1.5, color:mode === 'light' ? 'text.primary' : 'text.secondary'}}>

                        <MonitorWeightOutlinedIcon sx={{mr:1}} />
                        <Typography>{pokemonResult['weight']} kg</Typography>
                      </Box>
                      <Box sx={{mt:'10%'}}>
                        <Typography variant='span' sx={{fontSize:13, fontWeight:'light', color:'primary.main'}}>Weight</Typography>
                      </Box>
                    </Grid>

                    <Divider orientation="vertical" sx={{bgcolor:mode === 'dark' ? 'rgb(255 255 255 / 12%)' : ''}} flexItem></Divider>

                    {/*Altura de pokemon*/}
                    <Grid item xs>
                      <Box sx={{display:'flex', justifyContent:'center', mt:1.5, color:mode === 'light' ? 'text.primary' : 'text.secondary'}}>
                        <MonitorWeightOutlinedIcon sx={{mr:1}} />
                        <Typography>{pokemonResult['height']} m</Typography>
                      </Box>
                      <Box sx={{mt:'10%'}}>
                        <Typography variant='span' sx={{fontSize:13, fontWeight:'light', color:'primary.main'}}>
                          Height
                        </Typography>
                      </Box>
                    </Grid>

                    <Divider orientation="vertical" sx={{bgcolor:mode === 'dark' ? 'rgb(255 255 255 / 12%)' : ''}} flexItem></Divider>

                    {/*Habilidades de pokemon*/}
                    <Grid item xs sx={{}}>
                      <Box sx={{justifyContent:'center', fontSize: 14, mt:0.1, color:mode === 'light' ? 'text.primary' : 'text.secondary'}}>
                        <Typography variant='span' sx={{textTransform:'capitalize'}}>{pokemonResult['abilities'][0].ability.name.replace('-', ' ')}</Typography>
                        <Typography variant='span' sx={{display:'block'}}>{pokemonResult['abilities'].length > 1 ? capitalize(pokemonResult['abilities'][1].ability.name.replace('-', ' ')) : <></>}</Typography>
                      </Box>
                      <Box sx={{mt:'5%'}}>
                        <Typography variant='span' sx={{fontSize:13, fontWeight:'light', color:'primary.main'}}>
                          Abilities
                        </Typography>
                      </Box>
                    </Grid>

                  </Grid>
                </Box>

                  {/*Descripción*/}
                  <Box component='div' sx={{textAlign:'justify'}}>
                    <Typography variation='span' sx={{m:2, pt:1, mx:3, fontSize:14, color:mode === 'light' ? 'text.primary' : 'text.secondary'}}>
                      {replaceChar(getFlavorText(pkmnDetail.flavor_text_entries, lang)[0], '\f', ' ')}
                    </Typography>
                  </Box>

                {/*Título Base Stats*/}
                <Typography variant='h6' color='primary' sx={{m:1, fontWeight:'Bold'}}>Base Stats</Typography>

                {/*Stats*/}
                <Box>
                  <Grid container>
                    {/*HP, ATK, DEF, etc...*/}
                    <Grid item sx={{width:'20%', flexDirection:'column', textAlign: 'right', pr:'5%', display:'flex', justifyContent:'space-around'}}>
                      {statsString('HP')}
                      {statsString('ATK')}
                      {statsString('DEF')}
                      {statsString('SATK')}
                      {statsString('SDEF')}
                      {statsString('SPD')}
                    </Grid>


                    <Divider orientation="vertical" sx={{bgcolor:mode === 'dark' ? 'rgb(255 255 255 / 12%)' : ''}} flexItem></Divider>

                    {/*Valores de stats*/}
                    <Grid item xs sx={{}}>
                    <Box sx={{ width: '90%', display:'block', color:mode === 'light' ? 'text.primary' : 'text.secondary'}}>

                      <Grid container >
                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][0]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{ backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:-1, mx:2, width:pokemonResult['stats'][0]['base_stat'] < 100 ? `${pokemonResult['stats'][0]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>

                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][1]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][1]['base_stat'] < 100 ? `${pokemonResult['stats'][1]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>

                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][2]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][2]['base_stat'] < 100 ? `${pokemonResult['stats'][2]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>

                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][3]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][3]['base_stat'] < 100 ? `${pokemonResult['stats'][3]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>

                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][4]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][4]['base_stat'] < 100 ? `${pokemonResult['stats'][4]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>

                          <Grid item xs={2}>
                            <Box sx={{pb:0.8}}>{pokemonResult['stats'][5]['base_stat']}</Box>
                          </Grid>
                          <Grid item xs={10}>
                            <Box>
                              <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                              <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][5]['base_stat'] < 100 ? `${pokemonResult['stats'][5]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                            </Box>
                          </Grid>
                      </Grid>

                    </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/*Título Details*/}
                    <Typography variant='h6' color='primary' sx={{m:1, fontWeight:'Bold'}}>Details</Typography>

                      {/*Base Happiness, Capture Rate y Base Esperience*/}
                      <Box sx={{m:1}}>
                        <Grid container sx={{fontSize:'80%', mb:2}}>
                          <Grid item xs={4} sx={{display:'flex', flexDirection:'column'}}>
                            {otherDetail(pkmnDetail['base_happiness'], 'Base Happiness', lang, mode)}
                          </Grid>
                          <Grid item xs={4}>
                            {otherDetail(pkmnDetail['capture_rate'], 'Capture Rate', lang, mode)}
                          </Grid>
                          <Grid item xs={4}>
                            {otherDetail(pokemonResult['base_experience'], 'Base Experience', lang , mode)}
                          </Grid>
                        </Grid>
                      </Box>
                  </Paper>
                </Slide>
                </Box>
             {/*</ThemeProvider>*/}

            </Box>
          </ThemeProvider>

        </Container>
      </AppBar>

    </Container>

  </motion.div>
  );

export default PresenterDashboard;
