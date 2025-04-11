# Käytetään Node.js:tä ympäristönä
FROM node:18

# Työskentelyhakemisto
WORKDIR /app

# Kopioidaan projektin riippuvuudet (frontend ja backend)
COPY package.json package-lock.json ./

# Asennetaan riippuvuudet
RUN npm install

# Kopioidaan kaikki projektin tiedostot
COPY . .

# Asetetaan portti backendille (Express)
EXPOSE 5000

# Käynnistetään palvelin
CMD ["node", "backend/server.js"]
