# php.dockerfile

# Använd PHP 8.2 med Apache
FROM php:8.2-apache

# Installera nödvändiga PHP-tillägg för MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-enable mysqli
