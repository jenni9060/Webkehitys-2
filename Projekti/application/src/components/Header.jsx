import logo from '../images/aurinkoarska_logo.png';

function Header({ onRegisterClick, onLoginClick }) {
  return (
    <header>
      <img src={logo} id="logo" alt="Aurinkoarska Logo" />
        <p>~ AurinkoArska.fi - Sää joka säällä ~</p>
        <nav>
            <button id="login" onClick={onLoginClick}>Kirjaudu</button>
            <button id="register" onClick={onRegisterClick}>Rekisteröidy</button>
        </nav>
    </header>
  );
}

export default Header;
