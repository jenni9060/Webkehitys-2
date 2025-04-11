function Weather({ data, city, isWeekly  }) {
    if (!data) {
        return;
    }



    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Renderöidään 7 päivän sää, jos käyttäjä on kirjautunut
    if (isWeekly) {
        return (
            <section id="weekly-weather">
                {data.map((day, index) => (
                    <div key={index} id="weather-card">
                        <div id="date-container">
                            <p id="date">{new Date(day.time).toLocaleDateString()}</p>
                        </div>
                        <div id="weather-info">
                            <p>
                                <strong>Paikkakunta:</strong> 
                                <span id="location-value">{" " + capitalizeFirstLetter(city) || "Ei saatavilla"}</span>
                            </p>
                            <hr />
                            <p>
                                <strong>Päivän ylin lämpötila:</strong> {day.temperature_2m_max} °C
                            </p>
                            <hr />
                            <p>
                                <strong>Päivän ylin lämpötila:</strong> {day.temperature_2m_min} °C
                            </p>
                            <hr />
                            <p>
                                <strong>Sademäärä:</strong> {day.rain_sum} mm
                            </p>
                            <hr />
                            <p>
                                <strong>Tuulen nopeus:</strong> {(day.wind_speed_10m_max / 3.6).toFixed(2)} m/s
                            </p>
                            <hr />
                            <p>
                                <strong>Päivän valon kesto:</strong> 
                                <span id="daylight-value">{" " + (day.daylight_duration / 3600).toFixed(2)} tuntia</span>
                            </p>
                        </div>
                    </div>
                ))}
            </section>
        );
    } else {
        // Renderöidään vain yksi päivän sää, jos käyttäjä ei ole kirjautunut
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
                            <span id="max-temperature-value">{" " + data[0].temperature_2m_max} °C</span>
                        </p>
                        <hr />
                        <p>
                            <strong>Päivän alin lämpötila:</strong> 
                            <span id="min-temperature-value">{" " + data[0].temperature_2m_min} °C</span>
                        </p>
                        <hr />
                        <p>
                            <strong>Sademäärä:</strong> 
                            <span id="rain-value">{" " + data[0].rain_sum} mm</span>
                        </p>
                        <hr />
                        <p>
                            <strong>Tuulen nopeus:</strong> 
                            <span id="wind-value">{" " + (data[0].wind_speed_10m_max / 3.6).toFixed(2)} m/s</span>
                        </p>
                        <hr />
                        <p>
                            <strong>Päivän valon kesto:</strong> 
                            <span id="daylight-value">{" " + (data[0].daylight_duration / 3600).toFixed(2)} tuntia</span>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default Weather;
