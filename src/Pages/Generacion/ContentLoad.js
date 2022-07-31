import { Box } from '@mui/material'
import MiniCardPokemon from './MiniCardPokemon'
import InfiniteScroll from 'react-infinite-scroll-component'
import { paginate } from 'utils.js'
import { motion } from "framer-motion";

export default function ContentLoad({ simpleData, detailData, setDetailData, inputText, page, setPage, mode, types}){
  let tempData = [];
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent:'center',
      transition: {
        staggerChildren: 0.5
      }
    }
  };

//Carga más datos a temData
  function fetchMoreData(page){
    setPage(page + 1)
    setDetailData(detailData.concat(paginate(simpleData.results, 18, page + 1)))
  }

  //Si hay contenido en el input de búsqueda filtra la lista de pkmn
  //Si no, entrega la lista completa
  //console.log(simpleData)
  if(inputText !== ''){tempData = simpleData.results.filter((pkmn) => pkmn.name.includes(inputText))}
  //console.log(simpleData.results.length);
  if(tempData.length > 0){
    return(tempData.map((x, i) =>
      <Box key={i} sx={{maxWidth:'180px'}}>
        <MiniCardPokemon p={x} mode={mode} typeFilter={types} />
      </Box>
    ))
    }else {
      return(
        <InfiniteScroll dataLength={detailData.length} style={{overflow:'hidden', maxWidth:'1100px'}}
          next={() => fetchMoreData(page)} hasMore={true} loader={<></>}>
          <motion.div initial='hidden' animate='show' variants={container}>
            {detailData.map((x, i) =>
                 <Box sx={{maxWidth:'30%'}} key={i}>
                   <MiniCardPokemon p={x} mode={mode} typeFilter={types} />
                 </Box>
              )}
          </motion.div>
        </InfiniteScroll>
      )
    }
  }
