const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Palvellaan staattiset tiedostot
app.use(express.static(path.join(__dirname, '/')));

// Pääsivu: index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
