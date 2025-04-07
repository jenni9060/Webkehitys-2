const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(); // Vierailija voi edetä ilman autentikointia
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Virheellinen token.' });
    }
};

app.post('/register', async (req, res) => {
    const { email, password, homeLocation } = req.body;
    console.log('Rekisteröitymisdata:', req.body); // Tulostaa käyttäjän syöttämät tiedot

    // Validoinnit ennen tietokantakyselyitä
    if (!email || !password) {
        return res.status(400).json({ error: 'Sähköposti ja salasana ovat pakollisia!' });
    }

    // Sähköpostin muodon tarkistus
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Anna oikeanmuotoinen sähköpostiosoite!' });
    }

    // Salasanan minimivaatimukset
    if (password.length < 6) {
        return res.status(400).json({ error: 'Salasanan täytyy olla vähintään 6 merkkiä pitkä!' });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        console.log('Käyttäjän tarkistus:', userCheck.rows);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Sähköpostiosoite on jo käytössä!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Salattu salasana:', hashedPassword);

        const newUser = await pool.query(
            'INSERT INTO Users (email, password, home_location) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, homeLocation]
        );
        console.log('Uusi käyttäjä:', newUser.rows);

        res.status(201).json({ message: 'Käyttäjä luotu onnistuneesti!', user: newUser.rows[0] });
    } catch (err) {
        console.error('Virhe:', err.message); // Lisää tarkempi virheviesti
        res.status(500).json({ error: 'Jokin meni vikaan palvelimella' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Kirjautumistiedot:', req.body); // Tulostaa käyttäjän syöttämät tiedot

    // Validoinnit ennen tietokantakyselyitä
    if (!email || !password) {
        return res.status(400).json({ error: 'Sähköposti ja salasana ovat pakollisia!' });
    }

    try {
        // Tarkista, löytyykö käyttäjä tietokannasta
        const userResult = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Virheellinen käyttäjätunnus, tai salasana.' });
        }

        const user = userResult.rows[0];
        console.log('Löydetty käyttäjä:', user);

        // Tarkista salasana
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Virheellinen käyttäjätunnus, tai salasana.' });
        }

        // Generoidaan token
        const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        // Palauta tiedot vastauksessa
        return res.status(200).json({
            message: 'Kirjautuminen onnistui!',
            user: {
                location: user.home_location,
                token: token,
            },
        });
    } catch (err) {
        console.error('Virhe:', err.message);
        res.status(500).json({ error: 'Palvelinvirhe kirjautumisessa.' });
    }
});


app.get('/weather', authenticate, async (req, res) => {
    const { city } = req.query; // Kaupunki haetaan kyselyparametrista (query)
    let location = city;

    // Tarkista, onko käyttäjä kirjautunut
    if (req.user) {
        console.log('Kirjautunut käyttäjä:', req.user);
        // Hae kotipaikkakunta kirjautuneen käyttäjän tiedoista, jos se on määritetty
        const userResult = await pool.query('SELECT home_location FROM Users WHERE email = $1', [req.user.email]);
        const homeLocation = userResult.rows[0]?.home_location;

        if (homeLocation) {
            location = homeLocation; // Käytetään kotipaikkakuntaa
        }
    }
    console.log('Paikkakunta:', location); // Tulostaa käytetyn paikkakunnan
    if (!location) {
        return res.status(400).json({ error: 'Kaupunkia ei annettu.' });
    }

    try {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,sunset,daylight_duration&timezone=auto`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Palauta 7 päivän data kirjautuneille ja yhden päivän data vierailijoille
        const forecast = req.user ? data.daily : [data.daily[0]];
        res.status(200).json(forecast);
    } catch (err) {
        console.error('Virhe säädatan hakemisessa:', err.message);
        res.status(500).json({ error: 'Virhe säädatan hakemisessa.' });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Backend käynnissä portissa ${PORT}`));
