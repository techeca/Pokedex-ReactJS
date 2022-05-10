import React, { useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PresenterGeneration from './PresenterGeneration';
import { useParams } from 'react-router-dom'

function ContainerGeneration () {
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

  function fetchInventory() {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then(data => data.json())
  }

  //function fetchDetails() {
    //return fetch(`https://pokeapi.co/api/v2/pokemon-species/${idpkmn}`)
      //.then(data => data.json())
  //}

  useEffect(() => {
    let mounted = true;
    let load = true;
      fetchInventory()
      .then(items => {
        if({mounted}) {
          setData(items)
          load = false;
        }
      })
      .then(setLoading(false))


      return () => mounted = false;
  }, [])

  return(

    <PresenterGeneration pokemonResult={data} error={error} loading={loading} />

  )
}

export default ContainerGeneration;
