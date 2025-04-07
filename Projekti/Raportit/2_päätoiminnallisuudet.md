# Vaihe 2 - Perusrakenne ja päätoiminnallisuudet

## Ympäristö
- **Käytettävät teknologiat**: Sovellus on rakennettu käyttäen Reactia frontendissä ja Node.js:ää (Express) backendissä.
- **Pakolliset kirjasto- ja palvelut**:
  - Backend: `express`, `body-parser`, `bcrypt`, `cors`, `jsonwebtoken`, `pg` (PostgreSQL-yhteydet).
  - Frontend: Reactin ja useState sekä useEffect -hookien hyödyntäminen komponenttien hallinnassa.
- **Hostaus**: Sovellusta ajetaan paikallisesti (`localhost:5000` backendille).

## Taustajärjestelmä (Backend)
- **Reitit ja logiikka**:
  - **POST /login**: Kirjautumislogiikka, joka tarkistaa käyttäjätunnuksen ja salasanan. Palauttaa session tokenin sekä käyttäjän kotipaikkakunnan.
  - **POST /register**: Rekisteröintilogiikka, joka tallentaa käyttäjän sähköpostin, salasanan (bcryptillä hashattu) ja kotipaikkakunnan tietokantaan.
  - **GET /weather**: Säätietojen hakeminen käyttäjän paikkakunnan perusteella.
- **Middleware**: `authenticate` tarkistaa, onko käyttäjällä voimassa oleva JWT-token.
- **Tietoturva**: Tokenin käyttö autentikoinnissa. Sähköpostia ei palauteta kirjautumisen yhteydessä tietoturvasyistä.
- **Virheenkäsittely**:
  - 401 Unauthorized käyttäjätunnuksen tai salasanan virheille.
  - 500 Internal Server Error odottamattomille virheille.

## Käyttöliittymä (Frontend)
- **Reactin komponentit**:
  - **Header**: Näyttää navigointipainikkeet ja hallitsee kirjautumisen ja uloskirjautumisen logiikan.
  - **Search**: Hakukenttä, jossa käyttäjä voi syöttää paikkakunnan ja klikata "Hae sää" -painiketta.
  - **Weather**: Näyttää säätiedot (7 päivää kirjautuneille ja 1 päivä vierailijoille).
  - **Footer**: Näkyy vain, jos käyttäjä ei ole kirjautunut.
  - **Register & Login**: Dialogit rekisteröintiin ja kirjautumiseen.
- **Istunnon hallinta**:
  - SessionStoragea käytetään tokenin ja kotipaikkakunnan tallentamiseen käyttäjän kirjautumistilan säilyttämiseksi.
- **Tietojen päivitys**:
  - Sovelluksen käynnistyessä `useEffect` hakee oletuskaupungin (Helsingin) säädatan.

## Tietokanta
- **PostgreSQL-tietokanta**:
  - Käyttäjätaulu sisältää sarakkeet: sähköposti, salasana ja home_location.
  - Rekisteröinti tarkistaa, ettei sama sähköpostiosoite ole jo käytössä.
- **Tietokantakyselyt**:
  - Käyttäjätunnuksen hakeminen kirjautumisen yhteydessä.
  - `home_location`-tiedon palauttaminen säätiedon hakua varten.

## Perusrakenne ja arkkitehtuuri
- **Frontend**: React-pohjainen SPA (Single Page Application).
- **Backend**: RESTful API (Node.js ja Express).
- **Tietokanta**: PostgreSQL.
- **Tietoliikenne**: JSON-pohjainen tiedonsiirto frontendin ja backendin välillä.
- **Tietoturva**:
  - Tokenin käyttö autentikointiin.
  - Sähköposti piilotettu kirjautumisen vastauksesta.

## Toiminnot
- Käyttäjä voi kirjautua sisään ja ulos.
- Rekisteröinti tapahtuu sähköpostin, salasanan ja kotipaikkakunnan perusteella.
- Vierailija voi hakea päivän säätiedot oletuskaupungille, tai hakemalleen kaupungille (kirjautumatta)
- Kirjautunut näkee automaattisesti sään käyttäjän kotipaikkakunnalle ja voi hakea eri kaupunkien säätietoja.
- Vierailija ja kirjautunut voivat molemmat hakea eri kaupunkien säätietoja rajattomasti
- Käyttäjän token ja kotipaikkakunta tallennetaan istunnon ajaksi SessionStorageen.

## Koodin laatu ja dokumentointi
- **Kommentointi**: Jokainen funktio sisältää selkeät kommentit.
- **Modulaarisuus**: Eri komponentit (Header, Search, Weather) on jaettu omiin tiedostoihin.
- **Konsolilokit**: Debug-tulostus auttaa virheiden tunnistamisessa kehitysvaiheessa.
- **Tietoturvahuomiot**: Virheenkäsittely ja validointi estävät hyökkääjien toimintaa. Tutustuttu esim localStoragen ja sessionStoragen eroihin turvallisuuden kannalta. Kiinnitetty huomiota myös esim että käyttäjätunnuksen ja salasanan virheviestit ja responset ovat samanlaiset, jotta hyökkääjä ei voi erotella käyttäjätunnusta ja salasanaa

## Testaus ja virheenkäsittely
- **Testaus**:
  - Tarkistettu API:n reitit (esim. /login ja /weather) Insomnialla.
  - Manuaalinen testaus kehitystyön tukena
- **Virheiden hallinta**:
  - Näytetään virheilmoituksia, jos validoinneissa havaitaan virheitä
  - Virheviestit käyttäjälle jos palvelimeen ei saada yhteyttä, tai jos sääapi ei ole toiminnassa jostain syystä
  - Koodissa pyritään käsittelemään myös rajatapaukset

## Käyttöliittymä ja vuorovaikutus
- **Vuorovaikutus**:
  - Hakukenttä, jossa käyttäjä voi syöttää paikkakunnan ja klikata "Hae sää".
  - Kirjautuminen ja uloskirjautuminen painikkeilla Headerissa.
  - Dialogit rekisteröintiin ja kirjautumiseen.
  - Vierailevalle käyttäjälle footerissa teksti houkuttelemassa rekisteröitymään. Tekstiä ei renderöidä kun käyttäjä kirjautuu sisään
  - Käyttöliittymä on intuitiivinen ja selkeä
- **Dynaamisuus**:
  - Säädata päivittyy reaaliaikaisesti käyttäjän paikkakunnan perusteella.
  - Footer näkyy vain vierailijoille.
