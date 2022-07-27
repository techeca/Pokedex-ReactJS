import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Proyecto realizado con CRA.
        </p>
          <Link style={{textDecoration: 'none', color:'red'}} to="/pokeApp">Entrar</Link>
      </header>
    </div>
  );
}

export default Intro;
