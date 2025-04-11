import logo from '../images/aurinkoarska_logo.png';

function Header({ onRegisterClick, onLoginClick, user, onLogoutClick }) {
  return (
    <header>
      <img src={logo} id="logo" alt="Aurinkoarska Logo" />
        <p>~ AurinkoArska.fi - Sää joka säällä ~</p>
        <nav>
          {!user ? (
            <>
              <button id="login" onClick={onLoginClick}>Kirjaudu</button>
              <button id="register" onClick={onRegisterClick}>Rekisteröidy</button>
            </>
            ) : (
              <button id="logout" onClick={onLogoutClick}>Kirjaudu ulos</button>
            )}
        </nav>
    </header>
  );
}

export default Header;
