const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Käytetään JSON-middlewarea POST-datan käsittelyyn
app.use(express.json());

// Yhdistä SQLite-tietokantaan
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Tietokantavirhe:', err.message);
  } else {
    console.log('Yhteys SQLite-tietokantaan onnistui.');
  }
});

// Luo taulu, jos sitä ei ole olemassa
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE
)`);

// Luo uusi käyttäjä (Create)
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
  }

  const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.run(query, [name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email });
  });
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});