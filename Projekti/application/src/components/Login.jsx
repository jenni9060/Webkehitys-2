// <!-- Kirjaudu dialogi -->
import React, { useState } from 'react';

function Login({ onClose, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Estetään lomakkeen oletustoiminto

        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.status === 200) {
                setMessage('Kirjautuminen onnistui!');
                onLoginSuccess(data.user); // Tallenna käyttäjä ja sulje dialogi
                setTimeout(() => {
                    onClose(); // Sulkee dialogin pienen viiveen jälkeen
                }, 1000);
            } else {
                setMessage(data.error || 'Jokin meni vikaan.');
            }
        } catch (err) {
            setMessage('Palvelimeen ei voitu yhdistää.');
        }
    };

    return (
        <>
   <div id="login-dialog" className="dialog">
    <div className="dialog-content">
        <h2>Kirjaudu</h2>
        <form id="login-form" className="dialog-form" onSubmit={handleLogin}>
            <label htmlFor="email" className="labels">Sähköposti</label>
            <input type="email" id="email" className="dialog-input" placeholder="Syötä sähköposti"value={email} onChange={(e) => setEmail(e.target.value)}></input>
            
            <label htmlFor="password" className="labels">Salasana</label>
            <input type="password" id="password" className="dialog-input" placeholder="Syötä salasana" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            
            <button type="submit" className="dialog-button">Kirjaudu sisään</button>
        </form>
        <p>{message}</p> {/* Näytetään onnistumis-/virheviesti */}
        <div className="close-container">
            <button id="close-login-dialog" className="close-button" onClick={onClose}>Sulje</button>
        </div>
    </div>
</div>
        </>
    );
}

export default Login;
