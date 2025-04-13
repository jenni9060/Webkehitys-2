# Vaihe 2 - Perusrakenne ja päätoiminnallisuudet

## Ympäristö
- **Teknologiat ja arkkitehtuuri:**

Sovellus koostuu kahdesta pääosasta:

**Frontend:** Rakennettu Reactilla, hyödyntäen SPA-arkkitehtuuria (single page application). Reactin hookeista käytetään useState ja useEffect tilan ja elinkaaren hallintaan.

**Backend:** Node.js (Express) tarjoaa RESTful API:n.
**Kontitus:** Dockerin avulla frontend ja backend on kontitettu erikseen, mahdollistaen helpon käyttöönoton ja skaalauksen. Sovellus on rakennettu ensin paikallisesti ja sen jälkeen kontitettu ja otettu käyttöön virtuaalikoneessa.
  - **Backend-kontti:** Node.js-palvelin pyörii erillään muista palveluista, ja sen yhteys PostgreSQL-tietokantaan hoidetaan ympäristömuuttujien kautta. Portti: 5000.
  - **Frontend-kontti:** React-sovellus pyörii omassa kontissaan ja palvelee käyttäjiä osoitteessa http://192.168.100.120:3000.
  - **PostgreSQL-kontti:** Tietokannan alustus tapahtuu automaattisesti käynnistyessä. Portti: 5432.

**Kirjastot:**

**Backend:**
`bcrypt:` Salasanojen hashaukseen.
`cors:` Mahdollistaa API-pyyntöjen ristikkäisverkkokutsut.
`jsonwebtoken:` Käytetään käyttäjien autentikointiin.
`pg:` PostgreSQL-tietokantayhteydet.

**Frontend:** 
Reactin hookit ja komponenttipohjainen arkkitehtuuri.

## Taustajärjestelmä (Backend)
- **Reitit ja logiikka**:
  - **POST /login**: Kirjautumislogiikka, joka tarkistaa käyttäjätunnuksen ja salasanan. Palauttaa JWT-tokenin, jolla käyttäjä voidaan autentikoida myöhemmissä pyynnöissä.
  - **POST /register**: Rekisteröintilogiikka, joka tallentaa käyttäjän sähköpostin, salasanan (bcryptillä hashattu) ja kotipaikkakunnan tietokantaan.
  - **GET /weather**: Säätietojen hakeminen käyttäjän paikkakunnan perusteella, tai käyttäjän hakusanalla.
  - **POST /search:** Tallentaa käyttäjän hakutiedot tietokantaan (vaatii autentikoinnin).
  - **GET /searchhistory:** Palauttaa käyttäjän hakuhistorian viimeisten 30 päivän ajalta.

- **Autentikointi ja tietoturva:**
  - **JWT-token autentikointiin:** Käyttäjän pyynnöt vahvistetaan tarkistamalla tokenin voimassaolo.
  - Salasanat tallennetaan turvallisesti hashattuina (bcrypt).
  - Tokenin käyttö autentikoinnissa. Sähköpostia ei palauteta kirjautumisen yhteydessä tietoturvasyistä.
  - Virheviestien suunnittelu estää tietovuotoja (esim. virheelliset tunnukset ja salasanat palauttavat saman virheen).
- **Virheenkäsittely**:
  - 401 Unauthorized käyttäjätunnuksen tai salasanan virheille.
  - 500 Internal Server Error odottamattomille virheille.
  - Yksityiskohtaiset virheilmoitukset kehittäjille (konsoliin) ja yleiset virheilmoitukset käyttäjille.

## Käyttöliittymä (Frontend)
- **Reactin komponentit**:
  - **Header**: Näyttää navigointipainikkeet ja hallitsee kirjautumisen ja uloskirjautumisen logiikan.
  - **Search**: Hakukenttä, jossa käyttäjä voi syöttää paikkakunnan ja klikata "Hae sää" -painiketta.
  - **Weather**: Näyttää säätiedot (7 päivää kirjautuneille ja 1 päivä vierailijoille).
  - **Footer**: Näkyy vain, jos käyttäjä ei ole kirjautunut.
  - **Register & Login**: Dialogit rekisteröintiin ja kirjautumiseen.
- **Istunnon hallinta**:
  - SessionStoragea käytetään tokenin ja kotipaikkakunnan tallentamiseen käyttäjän kirjautumistilan säilyttämiseksi.
  - Automaattinen säätietojen haku kirjautuneen käyttäjän kotipaikkakunnalle.
- **Tietojen päivitys**:
  - Sovelluksen käynnistyessä `useEffect` hakee oletuskaupungin (Helsingin) säädatan.
  Dynaamisuus:
- **Muuta oleellista:**
  - Hakukenttä ja säätiedot päivittyvät käyttäjän valintojen mukaan reaaliaikaisesti.
  - **Näkyvyyslogiikka:** Footer näkyy vain vierailijoille.

## Tietokanta (PostgreSQL)
  Rakenteet ja yhteydet:
- **PostgreSQL-tietokanta**:
  - **Käyttäjätaulu (users):**
Sähköposti on uniikki, ja salasanat tallennetaan turvallisesti hashattuina.
Kotipaikkakunta tallennetaan selkeänä tekstinä.

  - **Hakuhistoriataulu (searchhistory):**
Tallentaa käyttäjän haetut kaupungit ja päivämäärät. `user_id` viittaa käyttäjätauluun ulkoisella avaimella.

Tietokantakyselyt:
- Haku ja validointi rekisteröinnin yhteydessä.
- Haku kirjautumisen yhteydessä
- Kotipaikkakunnan haku säätietojen näyttämistä varten.
- Hakuhistoria yhdistetään käyttäjän ID:hen käyttäjätaulussa.

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
- Vierailija voi hakea päivän säätiedot oletuskaupungille (Helsinki), tai hakemalleen kaupungille (kirjautumatta)
- Kirjautunut näkee automaattisesti sään käyttäjän kotipaikkakunnalle ja voi hakea eri kaupunkien säätietoja.
- Vierailija ja kirjautunut voivat molemmat hakea eri kaupunkien säätietoja rajattomasti
- Käyttäjän token ja kotipaikkakunta tallennetaan istunnon ajaksi SessionStorageen.

## Koodin laatu ja dokumentointi
- **Kommentointi**: Jokainen funktio sisältää selkeät kommentit.
- **Modulaarisuus**: Eri komponentit (Header, Search, Weather..) on jaettu omiin tiedostoihin.
- **Konsolilokit**: Debug-tulostus auttaa virheiden tunnistamisessa kehitysvaiheessa.
- **Tietoturvahuomiot**: Virheenkäsittely ja validointi estävät hyökkääjien toimintaa. Tutustuttu esim localStoragen ja sessionStoragen eroihin turvallisuuden kannalta. Kiinnitetty huomiota myös esim että käyttäjätunnuksen ja salasanan virheviestit ja responset ovat samanlaiset, jotta hyökkääjä ei voi erotella käyttäjätunnusta ja salasanaa

## Testaus ja virheenkäsittely
- **Testaus**:
  - Tarkistettu API:n reitit (esim. /login ja /weather) Insomnialla.
  - Manuaalinen testaus kehitystyön tukena
  - Luotu yksikkötestejä komponenttien toimintojen tarkistukseen
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
  - Sivu on responsiivinen
