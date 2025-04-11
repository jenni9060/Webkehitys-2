# Käytetään Node.js:tä pohjana
FROM node:18

# Työskentelyhakemisto kontille
WORKDIR /app

# Kopioidaan backendin riippuvuudet
COPY package.json package-lock.json ./

# Asennetaan riippuvuudet
RUN npm install

# Kopioidaan kaikki backendin tiedostot
COPY . .

# Exponoidaan portti, jota Express käyttää (5000 tässä esimerkissä)
EXPOSE 5000

# Käynnistetään palvelin
CMD ["node", "server.js"]
