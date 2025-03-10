# Projektisuunnitelma

## AurinkoArska .fi
***"AurinkoArska on helppokäyttöinen verkkosivusto, jossa käyttäjät voivat tarkastella ajankohtaisia säätietoja paikkakunnan mukaan. Lisäksi käyttäjä voi rekisteröityä sivulle, jonka jälkeen kirjautuessaan sisään ohjelma näyttää käyttäjän asuinpaikkakunnan sään ja 7 vuorokauden sään ja lisäksi käyttäjä pystyy selata hakuhistoriaansa."***

---
## Käyttäjätarinat
**Käyttäjäpersoona 1: Eero Eläkeläinen**
 **Ikä:** 70
 **Ammatti:** Eläkeläinen
 **Tavoitteet:**
   * Haluaa saada nopeasti selvitettyä ajankohtaisen sään päivän ulkoiluharrasteita, tai kauppareissua varten
   * Arvostaa yksinkertaista ja selkeää sivustoa, jota on helppo käyttää ilman kirjautumista.

 **Haasteet:**
   * Ei halua tuhlata aikaansa monimutkaisiin kirjautumisprosesseihin
   * Etsii selkeää sivustoa, joka keskittyy ainoastaan sään näyttämiseen ilman monimutkaisuuksia

**Käyttäpersoona 2: Krista Kiireinen**
 **Ikä:** 38
 **Ammatti:** Projektipäällikkö kansainvälisessä yrityksessä
 **Tavoitteet:**
   * Haluaa tarkistaa säätiedot nopeasti ennen työpäivän alkua tai tärkeää tapaamista.
   * Arvostaa kotipaikkatietoon perustuvaa automaattista säätiedon esitystä kirjautuessaan sisään.
   * Hakuhistorian avulla pystyy helposti tarkistamaan säätietoja eri kaupungeista, joihin hän matkustaa usein.

 **Haasteet:**
   * Monet sääohjelmat näyttävät liian paljon erilaisia säätietoja, joten halutun tiedon etsiminen saattaa viedä aikaa.
   * Etsii intuitiivista ja nopeaa käyttöliittymää, joka ei vaadi ylimääräistä vaivannäköä.

**Käyttäjäpersoona 3: Maija Perheinen**
 **Ikä:** 35
 **Ammatti:** Lähihoitaja, perhevapaalla tällä hetkellä
 **Perhe:** Neljä lasta, iältään 0.5, 2, 5, 8 -vuotiaita
 **Tavoitteet:**
   * Tarkistaa sään nopeasti, jotta voi varautua lasten ulkoleikkeihin, koulumatkoihin ja harrastuksiin.
   * Ei halua hukata aikaa rekisteröitymiseen, vaan käyttää sovellusta kätevästi vierailijana.

 **Haasteet:**
   * Kiireisenä äitinä hänellä ei ole aikaa monimutkaisille käyttöliittymille, vaan hän haluaa tietää sataako/tuuleeko ulkona ja paljonko on lämpöä tai pakkasta.
   * Sään tarkistaminen on osa hänen aamurutiiniaan perheen aamutoimien keskellä, jolloin sovelluksen täytyy olla nopea ja selkeä.

**Käyttäjäpersoona 4: Jere Jaksavainen**
 **Ikä:** 25
 **Ammatti:** Personal trainer ja opiskelija
 **Tavoitteet:**
   * Tarkistaa sään ennen lenkkeilyä, pyöräilyä ja ulkona treenaamista.
   * Arvostaa tarkkaa tietoa, kuten tuulen nopeus ja sateen todennäköisyys, jotta voi suunnitella treeninsä oikein.
   * Haluaa pystyä katsomaan 7 vrk sään, jotta voi suunnitella jo tulevaisuuteenkin treenejänsä

 **Haasteet:**
   * Sään nopea vaihtelu tuo haasteita urheilusuunnitelmiin.
   * Ei kaipaa lisäominaisuuksia, vaan haluaa nopeasti vain olennaiset säätiedot yhdellä vilkaisulla, jotta voi esim todeta onko tänään ulko-, vai sisätreeni.

---

## Käyttötapaukset ja käyttäjäpolut

#### Sään hakeminen kaupunkia syöttämällä
 **Käyttötapaus:**
 **Käyttäjä:** Vierailija, tai kirjautunut käyttäjä
 **Toimenpiteet:** 
   * Käyttäjä haluaa nähdä kaupungin säätiedot, joten hän syöttää kaupungin nimen hakukenttään.
   * Ohjelma hakee ja näyttää kaupungin nykyisen sään.

 **Tulos:**
   * Vieraileva käyttäjä näkee päivän lämpötilan, säätilan, tuulen nopeuden ja ilmankosteuden.
   * Kirjautunut käyttäjä näkee 7 vuorokauden lämpötilan, säätilan, tuulen nopeuden ja ilmankosteuden.

 **Käyttäjäpolku vierailevan käyttäjän polusta:**
 → Käyttäjä avaa AurinkoArska.fi-sivuston. 
 → Sivusto avautuu alkunäkymään, jossa on hakukenttä ja "Hae sää" -painike. 
 → Käyttäjä syöttää kaupungin nimen (esim. "Kokkola") hakukenttään. 
 → Käyttäjä klikkaa "Hae sää" -painiketta. 
 → Sivusto lähettää pyynnön sääpalvelun API:lle ja saa kaupungin säätiedot. 
 → Sivusto näyttää haetun kaupungin säätiedot näytöllä.

#### Viikon sääennusteen tarkistaminen
 **Käyttötapaus:**
 **Käyttäjä:** Kirjautunut käyttäjä 
 **Toimenpiteet:** 
 * Käyttäjä haluaa tarkastella 7 vuorokauden sääennustetta, joten hän kirjoittaa kaupungin nimen hakukenttään
 * Ohjelma hakee kaupungin nykyisen sään lisäksi 7 päivän sääennusteen. 
 
 **Tulos:**
 * Käyttäjä voi nyt kirjauduttuaan nähdä kaupungin päivän sääennusteen lisäksi 7 päivän sääennusteen. 
 
 **Käyttäjäpolku:** 
 → Käyttäjä avaa AurinkoArska .fi:n. 
 → Käyttäjä syöttää kaupungin nimen hakukenttään (esim. "Kannus"). 
 → Käyttäjä klikkaa "Hae sää" -painiketta. 
 → Sivusto näyttää kaupungin nykyisen sään. 
 → Sivusto hakee ja näyttää lisäksi 7 vuorokauden sääennusteen.

#### Rekisteröityminen kotipaikkasään ja hakuhistorian käyttöönottamiseksi
 **Käyttötapaus:**
 **Käyttäjä:** Vieraileva käyttäjä, joka haluaa rekisteröityä ja saada paremmat palvelut käyttöön
 **Toimenpiteet:**
   * Käyttäjä rekisteröityy sivustolle tiedoilla: sähköposti,salasana, kotipaikkakunta

 **Tulos:**
   * Käyttäjä rekisteröityy sivustolle ja on saa nyt lisäpalvelut käyttöönsä

 **Käyttäjäpolku:** 
 → Käyttäjä avaa AurinkoArska .fi:n. 
 → Käyttäjä klikkaa "Rekisteröidy"-linkkiä. 
 → Sivusto näyttää rekisteröintilomakkeen, jossa on kentät sähköpostille, salasanalle ja kotipaikkakunnalle. 
 → Käyttäjä täyttää lomakkeen ja klikkaa "Lähetä". 
 → Sivusto tarkistaa syötetyt tiedot ja tallentaa ne tietokantaan. 
 → Käyttäjä saa vahvistuksen onnistuneesta rekisteröitymisestä. 
 → Käyttäjä voi nyt kirjautua sisään ja käyttää lisäpalveluja.

#### Automaattisen kotipaikkasään näyttäminen kirjautumisen yhteydessä
 **Käyttötapaus:**
 **Käyttäjä:** Sisäänkirjautunut käyttäjä
 **Toimenpiteet:**
   * Käyttäjä on rekisteröitynyt ja kirjautuu sisään.
   * Sovellus hakee käyttäjän tallennetun kotipaikan ja näyttää sen säätiedot automaattisesti.

 **Tulos:**
   * Käyttäjä näkee kotipaikkansa päivän ja 7 vuorokauden säätilan heti kirjautumisen jälkeen.

 **Käyttäjäpolku:** 
 → Käyttäjä avaa AurinkoArska .fi-sivuston. 
 → Käyttäjä valitsee "Kirjaudu sisään" -vaihtoehdon. 
 → Sivusto näyttää kirjautumislomakkeen, johon käyttäjä syöttää sähköpostinsa ja salasanansa. 
 → Käyttäjä klikkaa "Kirjaudu sisään" -painiketta. 
 → Sivusto hakee tietokannasta käyttäjän kotipaikkakunnan. 
 → Sivusto hakee ja näyttää käyttäjän kotipaikkakunnan nykyisen säätilan. 
 → Sivusto näyttää myös kotipaikan 7 päivän sääennusteen käyttäjälle kirjautumisen jälkeen.

#### Hakuhistorian tarkastelu
 **Käyttötapaus:**
 **Käyttäjä:** Sisäänkirjautunut käyttäjä
 **Toimenpiteet:**
   * Käyttäjä on kirjautunut ja haluaa selata hakuhistoriaansa. Hän valitsee historiavalikon ja näkee alasvetovalikossa aiemmin hakemansa kaupungit listattuna.
 **Tulos:**
   * Käyttäjä pystyy tarkistamaan säätiedot aiemmista hauistaan.

 **Käyttäjäpolku:** 
 → Käyttäjä avaa AurinkoArska .fi:n ja kirjautuu sisään. 
 → Sivusto näyttää käyttäjän kotipaikan säätilan ja käyttöliittymässä on myös historiavalikko. 
 → Käyttäjä klikkaa "Hakuhistoria"-painiketta. 
 → Sivusto näyttää listan aiemmin haetuista kaupungeista (esim. "Kannus, Kokkola, Oulu"). 
 → Käyttäjä valitsee kaupungin listalta (esim. "Oulu"). 
 → Sivusto näyttää Oulun säätiedot kyseiseltä ajankohdalta.

---