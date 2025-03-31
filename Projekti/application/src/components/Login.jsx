// <!-- Kirjaudu dialogi -->
function Login({ onClose }) {
    return (
        <>
   <div id="login-dialog" className="dialog">
    <div className="dialog-content">
        <h2>Kirjaudu</h2>
        <form id="login-form" className="dialog-form">
            <label htmlFor="email" className="labels">Sähköposti</label>
            <input type="email" id="email" className="dialog-input" placeholder="Syötä sähköposti"></input>
            
            <label htmlFor="password" className="labels">Salasana</label>
            <input type="password" id="password" className="dialog-input" placeholder="Syötä salasana"></input>
            
            <button type="submit" className="dialog-button">Kirjaudu sisään</button>
        </form>
        <div className="close-container">
            <button id="close-login-dialog" className="close-button" onClick={onClose}>Sulje</button>
        </div>
    </div>
</div>
        </>
    );
}

export default Login;
