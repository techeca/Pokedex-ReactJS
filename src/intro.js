import logo from './logo.svg';
import './App.css';
import { Link, HashRouter  } from 'react-router-dom';

function Intro() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Proyecto realizado con ReactJS, PokeAPI y MUI.
        </p>
          <Link to="/pokeApp">Entrar</Link>
      </header>
    </div>
  );
}

export default Intro;
