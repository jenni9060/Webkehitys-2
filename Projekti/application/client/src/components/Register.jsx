// <!-- Rekisteröidy dialogi -->
import React, { useState } from 'react';

function Register({ onClose }) {
    const apiBaseUrl = 'http://192.168.100.120:5000';
    const localhostUrl = 'http://localhost:5000';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

      // Haetaan koordinaatit paikkakunnalle (Tarkistetaan, että paikkakunta löytyy)
      const getCoordinates = async (city) => {
        const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=1`;
        try {
            const response = await fetch(geocodeApiUrl);
            const data = await response.json();
            if (data.length > 0) {
                return { latitude: data[0].lat, longitude: data[0].lon };
            }
            return null; // Palauta null, jos koordinaatteja ei löydy
        } catch (error) {
            console.error('Virhe koordinaattien hakemisessa:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Estetään lomakkeen oletustoiminto

        // Tarkistetaan, onko syötetty paikkakunta validi
        const coordinates = await getCoordinates(location);
        if (!coordinates) {
            setMessage(`Virheellinen paikkakunta: ${location}. Tarkista syöttö.`);
            return; // Lopetetaan rekisteröintiprosessi
        }

        const userData = {
            email,
            password,
            homeLocation: location, // Kotikaupungin tiedon nimi backendissä
        };

        try {
            const response = await fetch(`${apiBaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessage('Rekisteröityminen onnistui!');
                setEmail('');
                setPassword('');
                setLocation('');
                setTimeout(() => {
                    onClose(); // Sulkee dialogin pienen viiveen jälkeen
                }, 1000); // Viive (1 sekunti), jotta käyttäjä näkee onnistumisviestin
            } else {
                setMessage(data.error || 'Jokin meni vikaan.');
            }
        } catch (err) {
            setMessage('Palvelimeen ei voitu yhdistää.');
        }
    };

    return (
        <>
        <div id="register-dialog" className="dialog">
            <div className="dialog-content">
                <h2>Rekisteröidy</h2>
                <form id="register-form" className="dialog-form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="labels">Sähköposti</label>
                    <input type="email" id="email" className="dialog-input" placeholder="Syötä sähköposti" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    
                    <label htmlFor="password" className="labels">Salasana</label>
                    <input type="password" id="password" className="dialog-input" placeholder="Syötä salasana" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    
                    <label htmlFor="location" className="labels">Paikkakunta</label>
                    <input type="text" id="location" className="dialog-input" placeholder="Syötä paikkakunta" value={location} onChange={(e) => setLocation(e.target.value)}></input>
                    
                    <button type="submit" className="dialog-button">Rekisteröidy</button>
                </form>
                <p>{message}</p> {/* Näytetään onnistumis-/virheviesti */}
                <div className="close-container">
                    <button id="close-register-dialog" className="close-button" onClick={onClose}>Sulje</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
