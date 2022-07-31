import React, { useState, useEffect, useCallback, useContext} from 'react';
import PresenterCardWeb from './PresenterCardWeb';
import PresenterCardMobile from './PresenterCardMobile';
import { useParams, useNavigate } from 'react-router-dom'
import { userContext } from '../Context.js';
import { getDetailsPkmn, getMoreDetailsPkmn } from 'Data/APIPkmn.js'
//import {isMobile} from 'react-device-detect';

function Cont({mode}) {
  const [data, setData] = useState('');
  const [data2, setData2] = useState('');
  const [loading, setLoading] = useState(true);
  const { idpkmn } = useParams();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const webContext = useContext(userContext);
  //const [isMobile, setIsMobile] = useState(false);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const initWeb = useCallback(() => {
      getDetailsPkmn(idpkmn).then((data) => setData(data))
  }, [idpkmn])

  const moreDetails = useCallback(() => {
    getMoreDetailsPkmn(idpkmn).then((data) => setData2(data))
  }, [idpkmn])

  useEffect(() => {
    initWeb()
    moreDetails()
    window.addEventListener('resize', handleWindowSizeChange);
        return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [initWeb, moreDetails, width])

  const isMobile = width <= 1200;

  if(data && data2 && loading){setLoading(false)}

  if(isMobile){
    return(
      <PresenterCardMobile pokemonResult={data} pkmnDetail={data2} loading={loading} lang={webContext.lang} mode={mode} />
    )
  }else {
    return(

      <PresenterCardWeb pokemonResult={data} pkmnDetail={data2} loading={loading} lang={webContext.lang} mode={mode} />
    )
  }

}

export default Cont;
