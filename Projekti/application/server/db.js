const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'weather_app', // Tämä on tietokantasi nimi
//   password: 'kissakoira12', // Korvaa oikealla PostgreSQL-salasanallasi
//   port: 5432, // Oletusportti PostgreSQL:lle
// });

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost', // Tämä "db" viittaa Compose-palveluun
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'weather_app',
});

module.exports = pool;
