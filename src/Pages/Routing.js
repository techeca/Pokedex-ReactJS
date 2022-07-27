import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from 'Pages/Generacion/';
import ContainerCard from 'Pages/CardPokemon/';
import PokeApp from 'Pages/Dashboard/';
import Intro from '../intro.js';

function Routing({themeMode, changetheme, lang}) {
  //themeMode y lang se obtienen/generan desde localStorage
  //En realidad recibe el tema completo (tema actual)
  //pero solo se entrega el modo (dark o ligth) a Dashboard (Lista de generaciones)
  //Tambien viene el idioma
  //console.log(changetheme)
  return(
    <BrowserRouter basename='/Pokedex-ReactJS'>
        <Routes>
          <Route exact path='/' element={<Intro />} />
          <Route exact path='/pokeApp' element={<PokeApp lang={lang} mode={themeMode} changetheme={changetheme}/>} />
          <Route exact path='/generacion/:idgen' element={<Dashboard mode={themeMode} />} />
          <Route exact path='/pokemon/:idpkmn' element={<ContainerCard mode={themeMode} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Routing;
