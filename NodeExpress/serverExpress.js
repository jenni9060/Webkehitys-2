const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Palvellaan staattisia tiedostoja public-hakemistosta
app.use(express.static(path.join(__dirname, "public")));

// Palvellaan index.html-tiedostoa juuriosoitteessa
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Käsitellään 404-virhe
app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});