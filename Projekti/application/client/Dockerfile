# Käytetään Node.js:tä Reactin buildaamiseen
FROM node:18 AS build

# Työskentelyhakemisto Reactin rakennusvaiheelle
WORKDIR /app

# Kopioidaan React-projektin riippuvuudet
COPY package.json package-lock.json ./

# Asennetaan riippuvuudet
RUN npm install

# Kopioidaan kaikki tiedostot ja rakennetaan sovellus
COPY . .
RUN npm run build

# Käytetään Nginxiä valmiin sovelluksen tarjoamiseen
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponoidaan Nginxin käyttämä portti
EXPOSE 80

# Käynnistetään Nginx-palvelin
CMD ["nginx", "-g", "daemon off;"]
