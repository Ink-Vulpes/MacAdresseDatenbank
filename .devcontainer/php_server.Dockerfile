FROM php:8.3-apache

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN a2enmod rewrite

RUN pecl install xdebug \
	&& docker-php-ext-enable xdebug

RUN echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
	&& echo "xdebug.log=/var/log/xdebug.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN echo "display_errors=On" >> /usr/local/etc/php/conf.d/development.ini \
	&& echo "display_startup_errors=On" >> /usr/local/etc/php/conf.d/development.ini \
	&& echo "error_reporting=E_ALL" >> /usr/local/etc/php/conf.d/development.ini \
	&& echo "log_errors=On" >> /usr/local/etc/php/conf.d/development.ini \
	&& echo "error_log=/var/log/php_errors.log" >> /usr/local/etc/php/conf.d/development.ini

RUN mkdir -p /var/log && chmod 777 /var/log

RUN apt-get update && apt-get install -y \
	git \
	unzip \
	&& rm -rf /var/var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN echo "LogLevel info" >> /etc/apache2/apache2.conf \
	&& echo "ErrorLog /var/log/apache2/error.log" >> /etc/apache2/apache2.conf \
	&& echo "CustomLog /var/log/apache2/access.log combined" >> /etc/apache2/apache2.conf

RUN echo "memory_limit=256M" >> /usr/local/etc/php/conf.d/development.ini

EXPOSE 80