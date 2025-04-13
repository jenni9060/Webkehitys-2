import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Weather from './components/Weather';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
	const apiBaseUrl = 'http://192.168.100.120:5000';
    const localhostUrl = 'http://localhost:5000';

	// Tila rekisteröintidialogille
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	// Paikkakunnan ja säädatan tila
	let [city, setCity] = useState('Helsinki');
	const [searchCity, setSearchCity] = useState(''); // Käyttäjän syöttämä paikkakunta
	const [weatherData, setWeatherData] = useState(null); // Haettu säädata

	const [user, setUser] = useState(null); // Käyttäjätiedot

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
		sessionStorage.setItem('token', user.token); // Tallenna token SessionStorageen
		sessionStorage.setItem('location', user.location); // Tallenna kotipaikkakunta SessionStorageen
		setUser(user); // Tallenna käyttäjän tiedot Reactin tilaan
		fetchWeatherData(user.location); // Kutsu säädatan hakemista käyttäjän kotipaikkakunnalle
		CloseLoginDialog(); // Sulje kirjautumisdialogi

	};

	// Tapahtumankäsittelijä uloskirjautumiseen
	const logoutHandler = () => {
		sessionStorage.removeItem('token'); // Poista token SessionStoragesta
		sessionStorage.removeItem('location'); // Poista kotipaikkakunta SessionStoragesta
		setUser(null); // Nollaa käyttäjätila
		setSearchCity(''); // Tyhjennä hakukenttä
		setCity('Helsinki'); // Aseta oletuskaupungiksi Helsinki
		fetchWeatherData('Helsinki'); // Hae Helsingin säädata
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

	// Muotoile säädata haluttuun muotoon
	const formatWeatherData = (data) => {
		// Luodaan tyhjä taulukko muotoiltuja säädatan objekteja varten
		const formattedData = [];

		// Käydään läpi indeksit 0-6 (7 päivää)
		for (let index = 0; index < 7; index++) {
			// Luodaan objekti kullekin päivälle datan perusteella
			const dayData = {
				time: data.time[index],
				temperature_2m_max: data.temperature_2m_max[index],
				temperature_2m_min: data.temperature_2m_min[index],
				rain_sum: data.rain_sum[index],
				wind_speed_10m_max: data.wind_speed_10m_max[index],
				daylight_duration: data.daylight_duration[index],
				sunset: data.sunset[index],
			};

			// Lisätään objekti uuteen taulukkoon
			formattedData.push(dayData);
		}

		return formattedData; // Palautetaan muotoiltu taulukko
	};



	// Hae säätiedot paikkakunnan koordinaattien perusteella
	const fetchWeatherData = async (searchCity) => {
		let cityToSearch = searchCity || city; // Käytetään käyttäjän syöttämää paikkakuntaa tai oletuskaupunkia
		try {
			// Käytä getCoordinates hakeaksesi koordinaatit
			const coordinates = await getCoordinates(cityToSearch);
			// Jos koordinaatteja ei löydy, palataan oletuskaupunkiin
			if (!coordinates) {
				console.warn('Paikkakuntaa ei löytynyt. Käytetään oletuskaupunkia.');
				cityToSearch = city; // Päivitä kaupunki oletukseen (Helsinki)
				const defaultCoordinates = await getCoordinates(cityToSearch); // Hae koordinaatit oletukselle
				if (!defaultCoordinates) throw new Error('Oletuspaikkakunnan koordinaattien haku epäonnistui.');
				coordinates.latitude = defaultCoordinates.latitude;
				coordinates.longitude = defaultCoordinates.longitude;
			}

			const { latitude, longitude } = coordinates;

			// Hae sää Apista
			const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,sunset,daylight_duration&timezone=auto`;
			const response = await fetch(apiUrl);
			const data = await response.json();

			const formattedData = formatWeatherData(data.daily);

			// Päivitä kaupunki ja säädata tilaan
			setCity(cityToSearch);
			setWeatherData(formattedData);

			// Tallenna hakuhistoria, jos käyttäjä on kirjautunut
			const token = sessionStorage.getItem('token'); // Hae token sessionStorage:sta
			if (user && token) {
				await fetch(`${apiBaseUrl}/search`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ searched_city: cityToSearch }),
				});
			}
		} catch (error) {
			console.error('Virhe säädatan hakemisessa:', error);
			alert('Virhe säädatan hakemisessa. Tarkista yhteys tai kaupungin nimi.');
		}
	};

	// Hae oletuskaupunki Helsinki automaattisesti
	useEffect(() => {
		const token = sessionStorage.getItem('token'); // Hae token SessionStoragesta
		const homeLocation = sessionStorage.getItem('location'); // Hae kotipaikkakunta SessionStoragesta
		
		if (token && homeLocation) {
			setUser({ token, location: homeLocation }); // Palauta käyttäjätila
			fetchWeatherData(homeLocation); // Hae säätiedot käyttäjän kotipaikkakunnalle
		} else {
			fetchWeatherData(city); // Hae sää oletuskaupungille
		}
	}, []); // Tyhjä dependency array -> suoritetaan vain kerran

	const showFooter = !user; // Näytä footer vain, jos käyttäjä ei ole kirjautunut

	return (
		<div className="App">
			<Header 
				onRegisterClick={OpenRegisterDialog} 
				onLoginClick={OpenLoginDialog} 
				user={user} 
				onLogoutClick={logoutHandler} 
			/>
			<Search
				searchCity={searchCity}
				setSearchCity={setSearchCity} // Päivitetään hakukentän tila
				onSearch={(city) => fetchWeatherData(city || searchCity)} // Haetaan säätiedot "Hae sää" -painikkeen painalluksella
				user={user}
			/>
			<Weather data={weatherData} city={city} isWeekly={!!user?.token} />
			{showFooter && <Footer />}
			{isRegisterOpen && <Register onClose={CloseRegisterDialog} />}
			{isLoginOpen && <Login onClose={CloseLoginDialog} onLoginSuccess={handleLoginSuccess} />}
		</div>
	);
}


export default App;
