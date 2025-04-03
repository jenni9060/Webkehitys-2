import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Weather from './components/Weather';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  // Tila rekisteröintidialogille
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // Paikkakunnan ja säädatan tila
  let [city, setCity] = useState('Helsinki'); 
  const [searchCity, setSearchCity] = useState(''); // Käyttäjän syöttämä paikkakunta
  const [weatherData, setWeatherData] = useState(null); // Haettu säädata

  const [user, setUser] = useState(null);



  // Tapahtumankäsittelijä rekisteröintidialogin avaamiseen
  const OpenRegisterDialog = () => {
    setIsRegisterOpen(true); // Näytä dialogi
  };

  // Tapahtumankäsittelijä rekisteröintidialogin sulkemiseen
  const CloseRegisterDialog = () => {
    setIsRegisterOpen(false); // Piilota dialogi
  };

  // Tila Kirjautumisdialogille
  let [isLoginOpen, setIsLoginOpen] = useState(false);

  // Tapahtumankäsittelijä rekisteröintidialogin avaamiseen
  const OpenLoginDialog = () => {
    setIsLoginOpen(true); // Näytä dialogi
  };

  // Tapahtumankäsittelijä rekisteröintidialogin sulkemiseen
  const CloseLoginDialog = () => {
    setIsLoginOpen(false); // Piilota dialogi
  };

  // Tapahtumankäsittelijä onnistuneeseen kirjautumiseen
  const handleLoginSuccess = (user) => {
    console.log('user data ', user);
    localStorage.setItem('token', user.token); // Tallenna token selaimeen
    setUser({ user }); // Tallenna käyttäjän tiedot Reactin tilaan
    CloseLoginDialog(); // Sulje kirjautumisdialogi
};

  
    // Hae koordinaatit paikkakunnalle
    const getCoordinates = async (city) => {

      const geocodeApiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=1`;
      try {
        const response = await fetch(geocodeApiUrl);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          return { latitude: lat, longitude: lon };
        } else {
          throw new Error('Paikkakuntaa ei löytynyt.');
        }
      } catch (error) {
        console.error('Virhe koordinaattien hakemisessa:', error);
        alert('Virhe paikkakunnan hakemisessa. Tarkista syöttö.');
        return null;
      }
    };
  
    // Hae säätiedot paikkakunnan koordinaattien perusteella
    const fetchWeatherData = async (searchCity) => {
      // Jos käyttäjä on kirjautunut ja hänellä on kotipaikkakunta, käytetään sitä
      const cityToSearch = user?.homeLocation || searchCity;
  
      // if (!cityToSearch) {
      //     alert('Syötä paikkakunta ennen hakua!');
      //     return;
      // }
  
      try {
          // Käytä getCoordinates hakeaksesi koordinaatit
          const coordinates = await getCoordinates(cityToSearch);
          if (!coordinates) return;

          const { latitude, longitude } = coordinates;
  
          // Hae sää Apista
          const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,sunset,daylight_duration&timezone=auto`;
          const response = await fetch(apiUrl);
          const data = await response.json();
        
          console.log('Säätiedot:', data);
  
          // Päivitä kaupunki ja säädata tilaan
          setCity(cityToSearch);
          setWeatherData(data.daily);
      } catch (error) {
          console.error('Virhe säädatan hakemisessa:', error);
          alert('Virhe säädatan hakemisessa. Tarkista yhteys tai kaupungin nimi.');
      }
  };

  // Hae oletuskaupunki Helsinki automaattisesti
  useEffect(() => {
    if (user?.homeLocation) {
        fetchWeatherData(user.homeLocation); // Hae sää käyttäjän kotipaikkakunnalle
    } else {
        fetchWeatherData(city); // Hae sää oletuskaupungille
    }
  }, []); // Tyhjä dependency array -> suoritetaan vain kerran

  return (
    <div className="App">
      <Header onRegisterClick={OpenRegisterDialog} onLoginClick={OpenLoginDialog}/>
      <Search searchCity={searchCity}
        setSearchCity={setSearchCity}
        onSearch={() => fetchWeatherData(searchCity)}/>
      <Weather data={weatherData} city={city} isWeekly={!!user?.token}/>
      <Footer />
      {isRegisterOpen && <Register onClose={CloseRegisterDialog} />}
      {isLoginOpen && <Login onClose={CloseLoginDialog} onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}


export default App;
