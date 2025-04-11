
import React, { useState, useEffect, useRef } from 'react';

function Search({ searchCity, setSearchCity, onSearch, user }) {
    const [searchHistory, setSearchHistory] = useState([]); // Tila hakuhistorialle
    const [showHistory, setShowHistory] = useState(false); // Tila dropdownille
    const historyRef = useRef(null); // Viittaus hakuhistoriaan

    const handleFetchHistory = async () => {
   
        try {
            const token = sessionStorage.getItem('token'); // Hae käyttäjän token
            const response = await fetch('http://localhost:5000/searchhistory', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Suodata uniikit paikkakunnat
                const uniqueCities = [...new Set(data.map(item => item.searched_city))];
                setSearchHistory(uniqueCities); // Tallenna vain uniikit kaupungit tilaan
                setShowHistory(true); // Näytä hakuhistoria
            } else {
                console.error('Virhe hakuhistorian haussa:', data.error);
            }
        } catch (err) {
            console.error('Virhe hakuhistorian haussa:', err);
        }
    };

    const handleHistorySelection = (selectedCity) => {
        setShowHistory(false); // Sulje alasvetovalikko
        setSearchCity(selectedCity); // Aseta valittu kaupunki hakukenttään
        onSearch(selectedCity); // Käynnistä haku valitulle kaupungille
    };

    const handleClickOutside = (event) => {
        // Tarkista ensin, että hakuhistoria on näkyvissä
        if (showHistory) {
            // Tarkista, onko viittaus olemassa ja sisältää klikkauskohteen
            if (historyRef.current && !historyRef.current.contains(event.target)) {
                setShowHistory(false); // Sulje dropdown
            }
        }
    };
    

    useEffect(() => {
        if (showHistory) {
            // Lisää kuuntelija klikkaukselle
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            // Poista kuuntelija, jos dropdown ei ole näkyvissä
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Siivoa tapahtumat
        };
    }, [showHistory]);
    

    return (
        <>
        <section id="welcome-text">
            <p>Tervetuloa AurinkoArska.fi-sivustolle!</p>
            <p>Syötä kaupungin nimi nähdäksesi ajankohtaiset säätiedot.</p>
        </section>
        <section id="search-input-section">
            <input type="text" id="city" placeholder="Syötä kaupunki" value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)} // Päivitä hakukentän tila
        ></input>
        </section>
        <section id="search-button-section">
            <div id="weather-button-container">
                {user && (
                    <button id="history-button" onClick={handleFetchHistory}>
                        <img src={`/file.png`} alt="Hakuhistoria Ikoni" />
                        Hakuhistoria
                    </button>
                )}
                <button id="search_weather" className="weather_button" onClick={() => onSearch(searchCity)}>Hae sää</button>
            </div>
                {showHistory && (
                    <ul id="history-dropdown" ref={historyRef}>
                        {searchHistory.length > 0 ? (
                            searchHistory.map((item, index) => (
                                <li key={index} onClick={() => handleHistorySelection(item)}>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <li>Ei hakuhistoriaa</li>
                        )}
                    </ul>
                )}
        </section>
        </>
    );
}

export default Search;