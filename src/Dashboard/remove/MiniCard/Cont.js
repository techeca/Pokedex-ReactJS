import React, { useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PresenterCard from './PresenterCard';
import { useParams } from 'react-router-dom'

function Cont (p) {
  const [data, setData] = useState([]);
  const strtest = JSON.stringify(data);
  const objtest = JSON.parse(strtest);
  const sprites = objtest['sprites'];
  const [data2, setData2] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState();
  const { idpkmn } = useParams();
  const [imgPkmn, setImgPkmn] = useState([]);
  const pkmn = p.p

  function fetchInventory() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pkmn.url}`)
    .then(data => data.json())
  }

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
          setLoading(false);
        }
      })


      return () => mounted = false;
  }, [])



  return(

    <PresenterCard pokemonResult={data} pkmnDetail={data2} error={error} loading={loading} imagen={imgPkmn}   />
  )
}

export default Cont;