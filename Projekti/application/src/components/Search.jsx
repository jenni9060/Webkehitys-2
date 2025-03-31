

function Search({ searchCity, setSearchCity, onSearch }) {
    return (
        <>
        <section id="welcome-text">
            <p>Tervetuloa AurinkoArska.fi-sivustolle!</p>
            <p>Syötä kaupungin nimi nähdäksesi ajankohtaiset säätiedot.</p>
        </section>
        <section id="search-input-section">
            <input type="text" id="city" placeholder="Syötä kaupunki" value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)} // Update input value
        ></input>
        </section>
        <section id="search-button-section">
            <div id="history-button-container">
            </div>
            <div id="weather-button-container">
                <button id="search_weather" className="weather_button" onClick={onSearch}>Hae sää</button>
            </div>
        </section>
        </>
    );
}

export default Search;