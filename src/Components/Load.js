import React from 'react';
import pokeball from '../LoadBall.css';
import Box from '@mui/material/Box';

function Load(){
  return(
    <Box sx={{height:'100vh',display:'flex', justifyContent:'center', mt:'65%'}}>
      <div className="pokeball">
      </div>
    </Box>
  )
}

export default Load;
