#!/bin/sh
# print all env
env

set -e

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$PG_DB_HOST" -U "$POSTGRES_USER" -c '\q'; do
  >&1 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&1 echo "Postgres is up - executing command"

if [ "$migrateDevArg" = "1" ]; then
  >&1 echo "migrateDevArg = 1 for migration"
  
  npxoLcation=$(which npx)
  >&1 echo "npx location: $npxoLcation"
fi
exec npm run start:prod_doc


