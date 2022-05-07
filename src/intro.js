import logo from './logo.svg';
import './App.css';

function Intro() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Proyecto realizado en ReactJS.
        </p>
        <a
          className="App-link"
          href="/pokeApp"
          target="_self"
          rel="noopener noreferrer"
        >
          Entrar
        </a>
      </header>
    </div>
  );
}

export default Intro;
