# Usa l'immagine ufficiale di PHP con Apache
FROM php:7.4-apache

# Aggiorna i pacchetti e installa curl
RUN apt-get update && apt-get install -y curl

# Copia il file index.php nella directory del server web
COPY backend/index.php /var/www/html/index.php

# Abilita il modulo mpm_prefork
RUN a2enmod mpm_prefork

# Aggiungi ServerName al file di configurazione di Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Espone la porta 80
EXPOSE 80