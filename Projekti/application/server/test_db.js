const pool = require('./db');

(async () => {
  try {
    const res = await pool.query('SELECT * FROM Users;'); // Tarkistaa, onko taulu 'Users' luotu
    console.log('Käyttäjät:', res.rows);
  } catch (err) {
    console.error('Tietokantavirhe:', err.message);
  } finally {
    pool.end();
  }
})();
