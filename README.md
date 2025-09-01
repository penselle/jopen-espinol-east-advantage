# Jopen Espinol East Advantage

A modern full-stack application leveraging Laravel 12, React (via InertiaJS), TailwindCSS, and MySQL. The project is fully containerized with Docker for streamlined development and deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Accessing the Application](#accessing-the-application)
6. [Default Login Credentials](#default-login-credentials)

## Prerequisites

Ensure the following software is installed on your system:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/penselle/jopen-espinol-east-advantage.git
cd jopen-espinol-east-advantage
```

## Configuration

Copy the example environment file and update the database credentials as needed:

```bash
cp .env.example .env
```

Edit the `.env` file and set your database configuration:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=ea-database
DB_USERNAME=ea-username
DB_PASSWORD=ea-password
```

## Running the Application

Build and start the Docker containers:

```bash
docker compose up --build
```

Once the containers are running, open a new terminal and initialize the application:

```bash
docker exec -it jopen-espinol-east-advantage-app-1 bash
php artisan key:generate
php artisan migrate
php artisan db:seed --class=DatabaseSeeder
npm run build
```

These commands will:
- Generate a new application key
- Run database migrations
- Seed the database with sample data
- Build frontend assets

## Accessing the Application

After setup, access the application at: [http://localhost:81](http://localhost:81)

## Default Login Credentials

Use the following credentials to log in:

- **Email:** email@example.com
- **Password:**