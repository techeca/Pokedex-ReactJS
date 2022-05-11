import React, { useState, useEffect, useCallback} from 'react';
import PresenterCardWeb from './PresenterCardWeb';
import PresenterCardMobile from './PresenterCardMobile';
import { useParams, useNavigate } from 'react-router-dom'
//import {isMobile} from 'react-device-detect';

function Cont ({match}) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idpkmn } = useParams();
  const [imgPkmn, setImgPkmn] = useState([]);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  //const [isMobile, setIsMobile] = useState(false);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

  const fetchInventory = useCallback(() => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idpkmn}`)
    .then(data => data.json())
  }, [idpkmn])

  const fetchDetails = useCallback(() => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${idpkmn}`)
      .then(data => data.json())
  }, [idpkmn])

  useEffect(() => {
    let mounted = true;
    let load1 = true;
    let load2 = true;
      fetchInventory()
      .then(items => {
        if({mounted}) {
          setData(items)
          setImgPkmn(items['sprites']['other']['official-artwork']['front_default'])
          load1 = false;
          if(!load2){setLoading(false)}
          window.scrollTo(0,0)

        }
      })

      fetchDetails()
      .then(items => {
        if({mounted}) {
          setData2(items)
          load2 = false;
          if(!load1){setLoading(false)}
        }
      })



      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }

  }, [fetchDetails, fetchInventory, width])

  const isMobile = width <= 768;

  if(isMobile){
    return(
      <PresenterCardMobile pokemonResult={data} pkmnDetail={data2} loading={loading} imagen={imgPkmn} navigate={navigate} />
    )
  }else {
    return(

      <PresenterCardWeb pokemonResult={data} pkmnDetail={data2} loading={loading} imagen={imgPkmn} navigate={navigate} />
    )
  }

}

export default Cont;
