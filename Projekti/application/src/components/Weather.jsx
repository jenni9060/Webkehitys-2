function Weather({ data, city }) {
    if (!data) {
        return <p>Syötä paikkakunta ja hae säätiedot.</p>;
    }
    console.log('Säätiedot:', data); // Tulostaa konsoliin haetut säätiedot

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    return (
        <section id="weather-result">
            <div id="weather-card">
                <div id="date-container">
                    <p id="date">{new Date().toLocaleDateString()}</p> {/* Näyttää nykyisen päivämäärän */}
                </div>
                <div id="weather-info">
                    <p>
                        <strong>Paikkakunta:</strong> 
                        <span id="location-value">{" " + capitalizeFirstLetter(city) || "Ei saatavilla"}</span>
                    </p>
                    <hr />
                    <p>
                        <strong>Päivän ylin lämpötila:</strong> 
                        <span id="max-temperature-value">{" " + data.temperature_2m_max[0]} °C</span>
                    </p>
                    <hr />
                    <p>
                        <strong>Päivän alin lämpötila:</strong> 
                        <span id="min-temperature-value">{" " + data.temperature_2m_min[0]} °C</span>
                    </p>
                    <hr />
                    <p>
                        <strong>Sademäärä:</strong> 
                        <span id="rain-value">{" " + data.rain_sum[0]} mm</span>
                    </p>
                    <hr />
                    <p>
                        <strong>Tuulen nopeus:</strong> 
                        <span id="wind-value">{" " + (data.wind_speed_10m_max[0] / 3.6).toFixed(2)} m/s</span>
                    </p>
                    <hr />
                    <p>
                        <strong>Päivän valon kesto:</strong> 
                        <span id="daylight-value">{" " + (data.daylight_duration[0] / 3600).toFixed(2)} tuntia</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Weather;
