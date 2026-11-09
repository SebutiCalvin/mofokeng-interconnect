#!/bin/bash

# Clear any cached config that might have been built without the key
php artisan config:clear

# Generate a key if one doesn't exist (Render usually provides it via Env Vars, but this is a safety net)
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Run database migrations to create the tables in the SQLite file
php artisan migrate --force

# Start Apache in the foreground to keep the container running
apache2-foreground