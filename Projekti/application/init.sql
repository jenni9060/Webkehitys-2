-- Luodaan "users"-taulu
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                      -- Ensisijainen avain
    email VARCHAR(255) UNIQUE NOT NULL,         -- Sähköposti, uniikki
    password VARCHAR(255) NOT NULL,             -- Hashattu salasana
    home_location VARCHAR(255) NOT NULL         -- Käyttäjän kotipaikka
);

-- Luodaan "searchhistory"-taulu
CREATE TABLE IF NOT EXISTS searchhistory (
    id SERIAL PRIMARY KEY,                      -- Ensisijainen avain
    user_id INTEGER NOT NULL,                   -- Viittaus käyttäjään
    searched_city VARCHAR(255) NOT NULL,        -- Haettu kaupunki
    search_date TIMESTAMP DEFAULT NOW(),        -- Hakupäivämäärä, oletus nykyhetki
    CONSTRAINT searchhistory_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE -- Ulkoinen avain "users"-tauluun
);
