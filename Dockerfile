FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gnupg \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libxpm-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    bash \
    fcgiwrap \
    libmcrypt-dev \
    libonig-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd \
    && docker-php-ext-install mysqli pdo_mysql mbstring zip exif pcntl bcmath opcache

# Install Composer
COPY --from=composer/composer:latest-bin /composer /usr/bin/composer

# Install Node.js v20.x and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm -v \
    && node -v

# Copy project files
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && mkdir -p /var/www/.npm \
    && chown -R www-data:www-data /var/www/.npm

# Switch to non-root user
USER www-data

# Run composer and npm install
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && npm install

EXPOSE 9000

CMD ["php-fpm"]
