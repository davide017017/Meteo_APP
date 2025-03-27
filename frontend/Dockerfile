# Usa l'immagine ufficiale di Node.js 20 con sistema operativo Alpine
FROM node:20-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file dell'applicazione
COPY . .

# Esegui la build di Next.js
RUN npm run build

# Espone la porta 3000
EXPOSE 3000

# Comando per avviare l'applicazione in produzione
CMD ["npm", "run", "start"]