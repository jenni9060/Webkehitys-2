const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { email, password, homeLocation } = req.body;
    console.log('Rekisteröitymisdata:', req.body); // Tulostaa käyttäjän syöttämät tiedot

    // Validoinnit ennen tietokantakyselyitä
    if (!email || !password) {
        return res.status(400).json({ error: 'Sähköpostiosoite ja salasana ovat pakollisia!' });
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


const PORT = 5000;
app.listen(PORT, () => console.log(`Backend käynnissä portissa ${PORT}`));
