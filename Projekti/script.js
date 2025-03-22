// Avaa rekisteröitymisdialogi
document.getElementById("register").addEventListener("click", function () {
	document.getElementById("register-dialog").style.display = "flex";
});

// Sulje rekisteröitymisdialogi
document.getElementById("close-register-dialog").addEventListener("click", function () {
	document.getElementById("register-dialog").style.display = "none";
});

// Avaa kirjautumisdialogi
document.getElementById("login").addEventListener("click", function () {
	document.getElementById("login-dialog").style.display = "flex";
});

// Sulje kirjautumisdialogi
document.getElementById("close-login-dialog").addEventListener("click", function () {
	document.getElementById("login-dialog").style.display = "none";
});


// Open-Meteo API-pyynnön parametrit
const latitude = 60.1699; // Korvaa halutulla leveysasteella (esim. Helsinki)
const longitude = 24.9384; // Korvaa halutulla pituusasteella
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,sunset,daylight_duration&timezone=auto`;


// Hae API:n dataa
fetch(apiUrl)
	.then(response => response.json())
	.then(data => {
		console.log('Säätiedot:', data);

		// Hae kaupungin nimi ja napin elementit
		const searchButton = document.getElementById('search_weather');
		const cityInput = document.getElementById('city');

		// Kun käyttäjä painaa "Hae sää" -nappia
		searchButton.addEventListener('click', () => {
			const city = cityInput.value.trim();

			if (!city) {
				alert('Syötä kaupunki ennen hakua!');
				return;
			}

			// Tässä tulisi olla kaupungin sijaintitietojen (koordinaatit) haku. Tämä on yksinkertaistettu esimerkki:
			let latitude = 60.1699; // Oletuksena Helsinki
			let longitude = 24.9384;

			// Esimerkki kiinteiden koordinaattien käytöstä. Voit korvata nämä dynaamisesti.
			if (city.toLowerCase() === 'rovaniemi') {
				latitude = 66.5039;
				longitude = 25.7294;
			}

			const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,sunset,daylight_duration&timezone=auto`;

			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					console.log('Säätiedot:', data);

					const forecast = data.daily;

					// Aseta sääarvot HTML-elementteihin
					document.getElementById('location-value').textContent = city;
					document.getElementById('max-temperature-value').textContent = forecast.temperature_2m_max[0] + ' °C';
					document.getElementById('min-temperature-value').textContent = forecast.temperature_2m_min[0] + ' °C';
					document.getElementById('rain-value').textContent = forecast.rain_sum[0] + ' mm';
					document.getElementById('wind-value').textContent = forecast.wind_speed_10m_max[0] + ' km/h';
					// Muunnetaan päivänvalon kesto tunneiksi
					const daylightHours = (forecast.daylight_duration[0] / 3600).toFixed(2);
					document.getElementById('daylight-value').textContent = daylightHours + ' tuntia';
				})
				.catch(error => {
					console.error('Virhe API:n hakemisessa:', error);
					alert('Virhe säätietoja haettaessa. Tarkista yhteys tai kaupungin nimi.');
				});
		});

	})
	.catch(error => {
		console.error('Virhe API:n hakemisessa:', error);
	});

