import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';

function pokeApp() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Proyecto realizado en ReactJS.
        </p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar
        </a>
      </header>
    </div>
  );
}

export default pokeApp;
