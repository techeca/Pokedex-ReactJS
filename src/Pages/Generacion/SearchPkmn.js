import { Box, InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchComponent({ setInput }){

  function inputHandler(e) {
      setInput(e.target.value.toLowerCase())
  };

  return(
  <Box sx={{display:'flex', justifyContent:'center', mt:0.3}}>
    <Box sx={{width:'95%', border:2, display:'flex', backgroundColor:'primary.main', borderColor:'secondary.main'}} style={{borderRadius: '12px'}}>
      <Box sx={{width:'10%', mt:0.7}}>
        <SearchIcon color='' />
      </Box>
      <StyledInputBase sx={{width:'100%', mt:-0.3, ml:-5}}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => inputHandler(e) }/>
    </Box>
  </Box>
  )
}
