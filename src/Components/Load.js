import React from 'react';
import Box from '@mui/material/Box';
import './Styles/LoadBall.css'


//https://codepen.io/g00glen00b/pen/pNdvwN
function Load(){
  return(
    <Box sx={{height:'100vh',display:'flex', justifyContent:'center'}}>
      <div className='pokeball'>
        <div className='upper'>
          <div className='inner'></div>
        </div>
        <div className='middle'></div>
        <div className='lower'>
          <div className='inner'></div>
        </div>
      </div>
    </Box>
  )
}

export default Load;
