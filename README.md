# Jopen Espinol East Advantage

This project is a full-stack application built with Laravel 12, React (InertiaJS), and styled with TailwindCSS. It uses MySQL as the database and is containerized with Docker for easy deployment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Guide](#installation-guide)
3. [Project Setup](#project-setup)
4. [Access the Application](#access-the-application)
5. [Login Credentials](#login-credentials)

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Installation Guide

Follow the steps below to set up the application locally:

### 1. Git Clone

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/penselle/jopen-espinol-east-advantage.git
cd jopen-espinol-east-advantage

### 2. Copy .env and Edit the Database Credentials
```bash
cp .env.example .env

Then, open the .env file and modify the database connection credentials to match your setup:

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=ea-database
DB_USERNAME=ea-username
DB_PASSWORD=ea-password


### 3. Run Docker Build
Now, you can build and start the Docker containers using the following command:

```bash
docker compose up --build

This will initialize the Docker containers for both the frontend and backend.

### 4. Setup the Application
Open a new terminal tab, navigate to the project directory, and execute the following commands:

```bash
docker exec -it jopen-espinol-east-advantage-app-1 bash
php artisan key:generate
php artisan migrate
php artisan db:seed --class=DatabaseSeeder
npm run build

These commands will:
Generate a new application key.
Run database migrations.
Seed the database with sample data.
Build the frontend assets using npm.

### 5. Access the Application
After the setup is complete, you can access the application by visiting:
http://localhost:81

### 6. Login Credentials
You can log in using the following default credentials:

Email: email@example.com
Password: 12345678
