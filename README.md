# ☀️ Wheater - App (PHP)

Un'applicazione web per visualizzare le informazioni meteorologiche, con un frontend moderno sviluppato in Next.js e un backend robusto in PHP.

## 📸 Anteprima

![Screenshot App](frontend/public/Screenshot.JPG)

## 🛠️ Tecnologie Utilizzate

* **Frontend:**
    * [Next.js](https://nextjs.org/) (versione 15 o successiva)
    * [React](https://reactjs.org/)
    * [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) (o altro sistema di styling utilizzato)
    * TypeScript
* **Backend:**
    * PHP (versione 7.4)
    * [Apache](https://httpd.apache.org/)
* **Containerizzazione:**
    * [Docker](https://www.docker.com/)
    * [Docker Compose](https://docs.docker.com/compose/install/)
* **API Meteo:**
    * [OpenWeatherMap](https://openweathermap.org/)

## ⚙️ Prerequisiti

* [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/) installati sulla tua macchina.
* Un account su [OpenWeatherMap](https://openweathermap.org/) per ottenere una chiave API gratuita.

## 💾 Come Avviare l'Applicazione Localmente

1. **Scarica il progetto:**
   Se stai visualizzando questo README su una piattaforma come GitHub, puoi scaricare il progetto in diversi modi:
   * **Clonando il repository con Git:**
     ```bash
     git clone [git@github.com:davide017017/Meteo_APP.git]
     cd [Meteo_APP]
     ```
   * **Scaricando come file ZIP:** Solitamente c'è un pulsante "Code" (o simile) sul repository che ti permette di scaricare il progetto come archivio ZIP. Estrai l'archivio in una cartella sul tuo computer.

2. **Configura le variabili d'ambiente:**
   * Nella directory principale del progetto, crea un file chiamato `.env`.
   * Apri il file `.env` con un editor di testo e aggiungi la tua chiave API di OpenWeatherMap:
     ```
     OPENWEATHERMAP_API_KEY=la_tua_chiave_api_di_openweathermap
     ```
     *(Sostituisci `la_tua_chiave_api_di_openweathermap` con la tua vera chiave API che hai ottenuto da [OpenWeatherMap](https://openweathermap.org/)).*

3. **Avvia i container Docker:**
   Nella directory principale del progetto (dove si trova il file `docker-compose.yml`), apri il tuo terminale o prompt dei comandi ed esegui il comando:
   ```bash
   docker-compose up -d

4. **Accedi all'applicazione:**
   Apri il tuo browser e vai all'indirizzo [http://localhost:3000](http://localhost:3000) per visualizzare l'applicazione frontend.

5. **Testare l'API Backend (opzionale):**
   Puoi testare direttamente l'API PHP andando all'indirizzo [http://localhost:8090/index.php?city=Genova](http://localhost:8090/index.php?city=Genova) nel tuo browser.

## 🧑‍💻 Autore

[davide017017 - Davide Martinco] - [[Link al tuo profilo GitHub o Portfolio ](https://github.com/davide017017)]

**Realizzato con ❤️ e codice da davide017017**