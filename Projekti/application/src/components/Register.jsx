// <!-- Rekisteröidy dialogi -->
function Register({ onClose }) {
    return (
        <>
        <div id="register-dialog" className="dialog">
            <div className="dialog-content">
                <h2>Rekisteröidy</h2>
                <form id="register-form" className="dialog-form">
                    <label htmlFor="email" className="labels">Sähköposti</label>
                    <input type="email" id="email" className="dialog-input" placeholder="Syötä sähköposti"></input>
                    
                    <label htmlFor="password" className="labels">Salasana</label>
                    <input type="password" id="password" className="dialog-input" placeholder="Syötä salasana"></input>
                    
                    <label htmlFor="location" className="labels">Paikkakunta</label>
                    <input type="text" id="location" className="dialog-input" placeholder="Syötä paikkakunta"></input>
                    
                    <button type="submit" className="dialog-button">Rekisteröidy</button>
                </form>
                <div className="close-container">
                    <button id="close-register-dialog" className="close-button" onClick={onClose}>Sulje</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
