const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'weather_app', // Tämä on tietokantasi nimi
  password: 'kissakoira12', // Korvaa oikealla PostgreSQL-salasanallasi
  port: 5432, // Oletusportti PostgreSQL:lle
});

module.exports = pool;
