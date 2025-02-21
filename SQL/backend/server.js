const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require("cors");

const app = express();
const port = 3000;

// Käytetään JSON-middlewarea POST-datan käsittelyyn
app.use(express.json());

// Sallitaan CORS (React-frontendille)
app.use(cors());

// Palvellaan staattiset tiedostot "public" -kansiosta
//app.use(express.static(path.join(__dirname, 'public')));

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
  age INTEGER,
  city TEXT,
  color TEXT
)`);

// Hae HTML-sivu pääreitillä
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// Luo uusi käyttäjä (Create)
app.post('/users', (req, res) => {
  const { name, age, city, color } = req.body;
  if (!name || !color || !age || !city) {
    return res.status(400).json({ error: 'Nimi, ikä, kaupunki ja lempiväri vaaditaan' });
  }

  const query = `INSERT INTO users (name, age, city, color) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, age, city, color], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, age, city, color });
  });
});

// Hae kaikki käyttäjät (Read)
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

// Päivitä käyttäjän tiedot (Update)
app.put('/users/:id', (req, res) => {
    const { name, age, city, color } = req.body;
    const { id } = req.params;
  
    if (!name || !color || !age || !city) {
      return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
    }
  
    const query = `UPDATE users SET name = ?, age = ?, city = ?, color = ? WHERE id = ?`;
    db.run(query, [name, age, city, color, id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
      }
      res.json({ message: 'Käyttäjän tiedot päivitetty', id });
    });
  });

  // Poista käyttäjä (Delete)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
  
    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
      }
      res.json({ message: 'Käyttäjä poistettu', id });
    });
  });

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});