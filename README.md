Frisörbokning – React, PHP, MySQL, Docker Ett bokningssystem där kunder kan välja behandling, frisör, tid och fylla i sina kontaktuppgifter. Bokningarna sparas i en MySQL-databas via en PHP-backend.

Tekniker:

Frontend: React + Parcel + CSS

Backend: PHP + MySQL

Container: Docker och docker-compose

Huvudfunktioner:

Val av behandling och frisör

Kalender som visar lediga tider baserat på behandlingens varaktighet

Formulär för kunduppgifter

Bokning sparas i databasen

Projektstruktur:

/backend – PHP och MySQL-hantering

/frontend – React-applikation

docker-compose.yml – Startar backend och databas

För att köra projektet:

docker-compose up -d

cd frontend, npm start