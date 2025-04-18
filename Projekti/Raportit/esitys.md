# Vaihe 4 – Projektin esittely


## 🎯 Projektin nimi

**AurinkoArska** - Säätietoja tarjoava verkkosivusto

---

## 📝 Projektin aiheen esittely

AurinkoArska-verkkosivustolla käyttäjä voi hakea päivän säätietoja paikkakunnan perusteella. Käyttäjä voi kirjautumatta sivustolle hakea paikkakuntien säitä kirjoittamalla paikkakunnan nimi hakukenttään. Oletuksena sivulle tullessa käyttäjälle näytetään Helsingin tämän päivän sää. Käyttäjä voi lisäksi rekisteröityä verkkosivustolle, jolloin sisäänkirjautuessaan hän näkee määrittämänsä kotipaikkakunnan seitsemän vuorokauden säätiedot. Kirjautunut käyttäjä voi lisäksi hakea 7 vuorokauden säätiedot miltä tahansa paikkakunnalta.

Sivusto hakee säätiedot ilmaisesta ja kaikille avoimesta `api.open-meteo.com` rajapinnasta. Rajapinta hakee paikkakuntien säätiedot koordinaattien perusteella, joten ohjelma hakee muuntaa paikkakunnan nimen koordinaateiksi käyttämällä `nominatim.openstreetmap.org` rajapintaa, joka on myös ilmainen ja avoin.

Aihe projektille syntyi pallottelemalla eri sivustovaihtoehtoja. Sääsivusto kuulosti kaikkein mielenkiintoisimmalta ja olikin mielekästä hakea ja esittää oikeaa säädataa rajapinnasta.

---

## 📌 Käyttötapausten yhteenveto


| Käyttötapaus | Implementoitu (Kyllä/ei) | Demo / Muistiinpanot |
|----------|----------------------|------------------------|
| Sään hakeminen kaupunkia syöttämällä | Kyllä | Vieraileva ja kirjautunut käyttäjä voivat hakea säätietoja paikkakunnan perusteella. (Videon kohdassa 10.26)
| Viikon sääennusteen tarkistaminen | Kyllä | Kirjautunut käyttäjä voi tarkastella 7 vuorokauden säätietoa. Vieraileva käyttäjä ei saanut nähdä, eikä myöskään näe viikon säätä (11.31)|
| Rekisteröityminen kotipaikkasään ja hakuhistorian käyttöönottamiseksi | Kyllä | Vieraileva käyttäjä voi rekisteröityä ja tämän jälkeen kirjautua ja tarkastella kotipaikkasäätään, sekä 30 vuorokauden hakuhistoriaansa (10.57)|
| Automaattisen kotipaikkasään näyttäminen kirjautumisen yhteydessä | Kyllä | Kirjautuessaan sivustolle käyttäjä näkee heti valitsemansa kotipaikkakuntansa säätiedot. Jos kotipaikkakunta on esim virheellisesti kirjoitettu, näytetään oletuskaupungin (Helsingin) säätiedot (11.31)|
| Hakuhistorian tarkastelu | Kyllä | Kirjautunut käyttäjä voi selata 30 vrk hakuhistoriaansa ja klikkaamalla paikkakuntaa hakuhistoriavalikosta, sivu hakee heti valitun paikkakunnan säätiedot (12.26)|
| Kirjautuneen käyttäjän uloskirjautuminen | Kyllä | Tätä ei käyttötapauksiin kirjattu, mutta toiminnallisuus toteutettiin silti ja käyttäjän on mahdollista uloskirjautua, jolloin sivusto palauttaa oletuspaikkakunnan vuorokausisään näkymän (12.41)|


---

## ✍️ Tekninen implementaatio

### Palvelin
* Paikallinen virtuaalikone
  * Käytän virtuaalikonetta, koska en halunnut joutua vahingossa maksamaan pilvipalvelun käytöstä (käytin azuressa jo sen ilmaisen kokeilun aiempaan tehtävään)
* Virtuaalikoneen käyttöjärjestelmänä Debian
* PostgreSQL tietokantana
* Virtuaalikoneessa käytössä Docker, backendista ja frontendista luotu kontit, joita ajetaan dockerilla

### Backend
* Node.js ja Express.js REST API -päätepisteiden toteutukseen.
* PostgreSQL:n yhteyden hallintaan käytetään node-postgres (pg) -kirjastoa.
* WeatherAPI rajapintana säätietojen reaaliaikaiseen hakemiseen.
* Kontitettu omaksi kontiksi ja ajetaan virtuaalikoneessa
* Käytetään bcrypt-kirjastoa salasanojen suojaamiseen

### Frontend
* React käyttöliittymän toteutukseen
* Kontitettu omaksi kontiksi ja ajetaan virtuaalikoneessa

### Tietokanta
* PostgreSQL toimii tietokantana.

### Rajapinnat
* api.open-meteo.com - Ilmainen ja avoin rajapinta säätietojen hakemiseen koordinaattien avulla
* nominatim.openstreetmap.org - Ilmainen ja avoin rajapinta paikkakunnan koordinaattien hakemista varten

---

## 🚂 Kehitysprosessi ja reflektiota

Kehitysprosessi alkoi verkkosivun suunnittelulla. Ensin pohdein mitä kaikkia toiminnallisuuksia sivuston pitäisi sisältää ja sen perusteella loin käyttäjätarinat ja käyttötapaukset ohjelmalle. Suunnittelin myös millä työkaluilla ja mitä menetelmiä tulen käyttämään kehitystyössä. Lisäksi suunnittelin sivustolle ulkoasun Figmaa käyttäen, suunnittelin sivustolle nimen ja logon.

Sitten alkoi itse ohjelman kehitysvaihe. Aloitin luomalla sivustolle yksinkertaisen ulkoasun ulkoasusuunnitelmaani mukaillen. Seuraavaksi aloin testaamaan sää-rajapinnan käyttöä ja että miten saan haettua paikkakunnan sään rajapinnasta. Työnsin myös ohjelman suoraan virtuaalikoneeseen ja loin sitä sieltä käsin. Tässä vaiheessa kuitenkin hetken työskenneltyäni tajusin, että olen tekemässä sivustoa ilman Reactia, jolla olin suunnitellut sivun tekeväni. Halusin ehdottomasti Reactia käyttää, joten minun piti oikeastaan aloittaa sivun rakentaminen alusta. Lisäksi tässä vaiheessa jo tajusin, että oli melko työlästä aina käynnistää virtuaalikone työtä tehdessä. Koin helpommaksi vaihtoehdoksi luoda ohjelma ensin paikallisesti ja lopussa yrittää kontittaa projekti ja ottaa kontit käyttöön virtuaalikoneessa. Eniten pohdin tässä vaiheessa mitä tapahtuu jos en saakkaan kontteja toimimaan halutulla tavalla ja myös jos en saa paikallisesti luotua tietokantaa enää asennettua ja toimimaan kunnolla virtuaalikoneessa.

Tässä vaiheessa työ alkoikin sujua hienosti ja edetä vauhdilla. Sain melko vähäisen taistelun jälkeen tietokannan rakennettua ja sen toimimaan yhteistyössä backendin kanssa. Tietokannan taulut loin paikallisesti suoraan komentoriviltä ja sain ihmetellä kyllä aikani, että mihin se tietokanta meni ja miten pääsen tauluihin taas käsiksi. Lopulta se löytyi ja homma eteni jälleen. Olin suunnitteluvaiheessa miettinyt tekeväni ensin vierailevan käyttäjän toiminnot, sitten rekisteröityminen ja kirjautuminen ja jos aikaa jää niin hakuhistorian toteutus. Lisäksi olin ajatellut, että jos aikaa ei riitä niin voin kirjautumis ja rekisteröitymis dialogitkin vain rakentaa suoraan pääsivulle ilman erillisiä dialogeja. Kuitenkin homma edistyi siihen malliin, että sain kaikki haluamani toiminnallisuudet toteutettua ja olin lopputulokseen tyytyväinen. Tässä vaiheessa päätin myös luoda yksikkötestejä komponenttien toiminnallisuuksille. Lisäksi suoritin yksityiskohtaista manuaalista testausta, eli kävin läpi toimintoja ja testailin toimintoja UI:ssa.

Sitten alkoi se pelätty vaihe, eli dockerin käyttöönotto ja konttien rakentaminen, sekä käyttöönotto virtuaalikoneessa. Tässä vaiheessa meni kyllä aikaa ja minusta tuntui, että copilot:kaan ei ollut mikään ihan paras apuri tässä konfiguroimisessa. Kuitenkin kaikesta tuskasta ja hiestä huolimatta sain kontit luotua ja ohjelman toimimaan paikallisesti mainiosti! Tyytyväisenä puskin ohjelman repoon, siirryin virtuaalikoneeseen ja pullasin paketin. No ei mennyt ihan niinkuin strömssössä, vaan sain muuttaa konfiguraatiota, asennella tiettyjä juttuja ja muuttaa vähän ohjelmakoodiakin, mutta lopulta kontit käynnistyivät ja sivusto toimi! :)



---

## ☀️ Tulevaisuuden kehitysmahdollisuudet

Tulevaisuudessa muuttaisin ainakin sivuston ulkoasua sen verran, että käyttäisin jotain taulukko-kirjastoa ja rakentaisin taulukon, joka esittäisi säätiedot. Mielestäni tuo nykyesitys on aika Mikki Hiirimäinen ratkaisu, mutta se oli helpoin toteuttaa ja pidin tärkeämpänä itse toimintojen toimivuutta ja vähemmän tärkeänä sivuston ulkoasua. Lisäksi hakisin ehkä enemmän erilaisia säätietoja ja vaikkapa tuntisäätietoja.

---

## 📊 Työtuntien loki


| Date       | Time | Task                                |
|------------|------|-------------------------------------|
| 10.03.2025 | 6 | Luento + projektin suunnittelun aloitus  |
| 20.03.2025 | 5 | Sivuston ulkoasun koodaaminen  |
| 25.03.2025 | 3 | Sivun muutos käyttämään reactia  |
| 31.03.2025 | 5 | Sivun muutos käyttämään reactia + käyttäjän rekisteröityminen  |
| 3.04.2025 | 5 | Käyttäjän kirjautuminen |
| 7.04.2025 | 6 | Käyttäjän uloskirjautuminen, 7 päivän sää, hakuhistoria, session ylläpito |
| 11.04.2025 | 6 | hakuhistoria, docker ja virtuaalikoneeseen laittoa |
| 15.04.2025 | 3 | esitelmän tekoa |
| 18.04.2025 | 2 | esitelmän videon tekoa |
| **Total**  | **41h** |                                 |

---

## 🪢 Esityksen linkki

_Add a link to your video presentation or state that it was presented live._