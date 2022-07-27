import {Container, Paper, AppBar, Toolbar, Box, Typography, Avatar, IconButton, Chip, Grid, Divider, ThemeProvider, Slide} from '@mui/material'
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {capitalize, replaceChar, changeTheme, setZero} from 'utils.js'
import { motion } from "framer-motion"
import PokeTrans from 'images/poketransw.png'
import Load from 'Components/Load.js'

function otherDetail(pkmnValue, dataName){
  return(<>
    <Typography variant='' sx={{fontWeight:'medium'}}>
        {dataName}
    </Typography>
    <Typography sx={{fontSize:''}}>
        {pkmnValue}
    </Typography>
    </>)
}

function isBabyPkmn(pkmn){
if(pkmn['is_baby']){return(<Chip variant='outlined' color='primary' sx={{m:0.8, height:'25px', color:'primary', fontWeight:'medium'}} label='Baby'/>)}}
function isMithLeng(pkmn){
  if(pkmn['is_legendary']){return (<Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium'}} label='Legendary'/>)}

  if(pkmn['is_mythical']){
    return (
      <Chip variant='outlined' sx={{m:0.8, height:'25px', color:'black', fontWeight:'medium'}}
        label='Mythical'/>
    )
  }
}

const PresenterDashboard = ({pokemonResult, pkmnDetail, loading, imagen, navigate}) =>

  loading ? (<Load />) : (
  <motion.div style={{ opacity:0, width:'100%', height:'100%', overflow:'hidden'}} animate={{opacity:1}} transition={{duration:1}}>
  <ThemeProvider theme={changeTheme(pokemonResult['types'][0].type.name)} >

    <Container sx={{width:'100%', height:'100%'}} >
    <AppBar elevation={0} position='static' sx={{border:0, mt:2}} >

        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
          <IconButton onClick={() => navigate(-1)} sx={{ml:-15}}>
            <ArrowBackIosNewOutlinedIcon sx={{color:'white'}} />
          </IconButton>
          <Typography color='white' variant='h5' sx={{ml:2, fontWeight:'Bold', mt:0.5}}>
           {capitalize(pokemonResult.name)}
          </Typography>
        </Box>
        <Box sx={{flexGrow:0, color:'white'}}>
            {setZero(pokemonResult.id)}
        </Box>
        </Toolbar>

        <Box sx={{display:'flex', mb:-6}}>
          <Box sx={{border:1, color:'white' ,borderRadius:5, pl:1.3, pr:1.3, pt:0.5, pb:0.5, bgcolor:'text.primary'}}>
            <Typography variant='' sx={{fontSize:'0.80em'}}>
                {capitalize(pkmnDetail['generation']['name'].replace('-', ' '))}
            </Typography>
          </Box>
        </Box>

        <Box sx={{width:'100%', height:'100%',display:'flex', flexWrap:'nowrap', justifyContent:'center'}}>
            <Box sx={{display:'flex', mt:'40%', ml:-35, mr:5, flexWrap:'', width:'10%', height:'10%'}}>
              <IconButton href={pokemonResult.id === 1 ? `./151` : `./${pokemonResult.id-1}`} sx={{}}>
                <ArrowBackIosIcon sx={{color:'white'}} />
              </IconButton>
            </Box>

            <Box sx={{width:'60%', height:'100%', mt:'6%', mr:0}}>
              <Avatar src={PokeTrans} sx={{opacity:0.4, width:'100%', height:'100%'}} />
            </Box>

            <Box sx={{display:'flex', mt:'40%', ml:10, flexWrap:'', width:'10%', height:'10%'}}>
              <IconButton href={`./${pokemonResult.id+1}`} sx={{}}>
                <ArrowForwardIosIcon sx={{color:'white'}} />
              </IconButton>
            </Box>
        </Box>

        <Box sx={{mt:'-50%', display:'flex', flexWrap:'nowrap', mr:5}} >

          <motion.div style={{ y:150, opacity:0, width:'100%', height:'70vh'}} animate={{y:0, opacity:0.99}} transition={{duration:1}}>
              <Box sx={{mt:0}}>
              <img alt={pokemonResult.name} src={imagen} width='80%' height='80%'/>
              </Box>
          </motion.div>

          <motion.div style={{scale: 0}} animate={{ scale: 1 }} transition={{ duration: 1 }}>
          <Box sx={{width:'100%', height:'100%', mt:38}}>
          <Slide direction='up' in={true} timeout={0}>
            <Paper elevation={0} sx={{border:1, m:-40, borderRadius:'10px', borderColor:`primary.main`, ml:'30%'}}>

              <Box sx={{mt:'3%', display:'flex', justifyContent:'center', mb:'3%'}}>
                {isBabyPkmn(pkmnDetail)}
                {pokemonResult['types'].map((type) =>
                <ThemeProvider key={type.type.name} theme={changeTheme(type['type']['name'])}>
                <Chip color='primary' sx={{m:0.8, height:'25px', color:'white', fontWeight:'medium'}}
                  label={capitalize(type.type.name)}/>
                </ThemeProvider>
                )}
                {isMithLeng(pkmnDetail)}
              </Box>

          <Typography variant='h6' color='primary' sx={{m:2, fontWeight:'Bold'}}>About</Typography>

          <Box sx={{maxWidth:'100%'}}>
            <Grid container >

              <Grid item xs>
                <Box sx={{display:'flex', justifyContent:'center', mt:1.5}}>
                  <MonitorWeightOutlinedIcon sx={{mr:1}} />
                  {pokemonResult['weight']} kg
                </Box>
                <Box sx={{mt:'10%'}}>
                  <Typography variant='span' sx={{fontSize:13, fontWeight:'light'}}>
                    Weight
                  </Typography>
                </Box>
              </Grid>

              <Divider orientation="vertical" flexItem>
              </Divider>

              <Grid item xs sx={{}}>
                <Box sx={{display:'flex', justifyContent:'center', mt:1.5}}>
                  <MonitorWeightOutlinedIcon sx={{mr:1}} />
                  {pokemonResult['height']} m
                </Box>
                <Box sx={{mt:'10%'}}>
                  <Typography variant='span' sx={{fontSize:13, fontWeight:'light'}}>
                    Height
                  </Typography>
                </Box>
              </Grid>

              <Divider orientation="vertical" flexItem>
              </Divider>

              <Grid item xs sx={{}}>
                <Box sx={{justifyContent:'center', fontSize: 14, mt:0.1}}>
                  <Typography variant='span' sx={{textTransform:'capitalize'}}>
                    {pokemonResult['abilities'][0].ability.name}
                  </Typography>
                  <Typography variant='span' sx={{display:'block'}}>
                  {pokemonResult['abilities'].length > 1 ? capitalize(pokemonResult['abilities'][1].ability.name) : <></>}
                  </Typography>
                </Box>
                <Box sx={{mt:'5%'}}>
                  <Typography variant='span' sx={{fontSize:13, fontWeight:'light'}}>
                    Abilities
                  </Typography>
                </Box>
              </Grid>

            </Grid>
          </Box>

            <Box component='div' sx={{textAlign:'justify'}}>
              <Typography variation='span' sx={{m:2, pt:1, mx:3, fontSize:14}}>
                {replaceChar(pkmnDetail['flavor_text_entries'][1].flavor_text, '\f', ' ' )}
              </Typography>
            </Box>

          <Typography variant='h6' color='primary' sx={{m:1, fontWeight:'Bold'}}>Base Stats</Typography>

          <Box>
          <Grid container>
            <Grid item xs sx={{maxWidth:'20%',display:'flex', my:'auto', flexDirection:'column', alingItems:'flex-start', textAlign: 'right', pr:2}}>
              <Box sx={{}}>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:''}}>
                HP</Typography>
              </Box>
              <Box sx={{}}>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:0.8}}>
                ATK</Typography>
              </Box>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:0.8}}>
                DEF</Typography>
              <Box>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:0.8}}>
                SATK</Typography>
              </Box>
              <Box>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:0.8}}>
                SDEF</Typography>
              </Box>
              <Box>
                <Typography color='primary' variant='h5' sx={{fontSize:'0.83em', fontWeight:'bold', mt:0.8}}>
                SPD</Typography>
              </Box>

              <Box sx={{}}>
              </Box>
            </Grid>

            <Divider orientation="vertical" flexItem>
            </Divider>

            <Grid item xs sx={{}}>
            <Box sx={{ width: '90%', display:'block'}}>

              <Grid container >
                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][0]['base_stat']}</Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Box>
                      <Box sx={{ backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                      <Box sx={{backgroundColor:'primary.main', border:0, mt:-1, mx:2, width:pokemonResult['stats'][0]['base_stat'] < 100 ? `${pokemonResult['stats'][0]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][1]['base_stat']}</Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Box>
                      <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                      <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][1]['base_stat'] < 100 ? `${pokemonResult['stats'][1]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][2]['base_stat']}</Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Box>
                      <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                      <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][2]['base_stat'] < 100 ? `${pokemonResult['stats'][2]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][3]['base_stat']}</Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Box>
                      <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                      <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][3]['base_stat'] < 100 ? `${pokemonResult['stats'][3]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][4]['base_stat']}</Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Box>
                      <Box sx={{backgroundColor:'primary.main', border:0, mt:1, mx:2, height:'8px', borderRadius:'10px', opacity:0.2}}></Box>
                      <Box sx={{backgroundColor:'primary.main', mt:-1, mx:2, width:pokemonResult['stats'][4]['base_stat'] < 100 ? `${pokemonResult['stats'][4]['base_stat']}%` : '100%', height:'8px', borderRadius:'10px'}}></Box>
                    </Box>
                  </Grid>

                  <Grid item xs={2}>
                    <Box>{pokemonResult['stats'][5]['base_stat']}</Box>
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

              <Typography variant='h6' color='primary' sx={{m:1, fontWeight:'Bold'}}>Details</Typography>

                <Box sx={{m:1}}>
                  <Grid container sx={{fontSize:'75%', mb:2}}>
                    <Grid item xs={4} sx={{display:'flex', flexDirection:'column'}}>
                      {otherDetail(pkmnDetail['base_happiness'], 'Base Happiness')}
                    </Grid>
                    <Grid item xs={4}>
                      {otherDetail(pkmnDetail['capture_rate'], 'Capture Rate')}
                    </Grid>
                    <Grid item xs={4}>
                      {otherDetail(pokemonResult['base_experience'], 'Base Experience')}
                    </Grid>
                  </Grid>
                </Box>
            </Paper>
          </Slide>
          </Box>
          </motion.div>

        </Box>

    </AppBar>

    </Container>

  </ThemeProvider>
  </motion.div>
  );

export default PresenterDashboard;
