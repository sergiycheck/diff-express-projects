#!/bin/sh

appNetworkExists=$(docker network ls | grep web-app)

if [ -z "$appNetworkExists" ]; then
  >&1 echo "network web-app-network does not exist. Creating..."
  command docker network create web-app-network
  else
  >&1 echo "network web-app-network exists"
fi

pgExists=$(docker ps | grep postgress_db)
if [ -z "$pgExists" ]; then
  echo "running postgres"
# manually delete pg-db-data folder if previous runs fail
  command docker run -d \
  --name postgress_db \
  --network web-app-network --network-alias pg-net \
  -v $PWD/pg-db-data:/var/lib/postgresql/data \
  -p 5436:5432 \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=dev \
  postgres
  else
    echo "pg exists"
fi

nodeWebApiExists=$(docker ps | grep node_app1)
if [ -z "$nodeWebApiExists" ]; then
  echo "running webapi"

  # -p 5002:5002 \
  command docker run -d \
  --network web-app-network --name backend_app \
  -v "$PWD/logs:/home/node/app/logs" \
  -e NODE_ENV=production \
  -e PORT=5002 \
  -e PG_DB_PORT=5432 \
  -e PG_DB=dev \
  -e PG_DB_HOST=postgress_db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e migrateDevArg=1 \
  sergiycheck/node_app \
  sh -c "./entrypoint.sh"

  else
    echo "node exists"
fi

nginxExists=$(docker ps | grep nginx_app)
if [ -z "$nginxExists" ]; then
  echo "running nginx"

  command docker run -d \
  --network web-app-network \
  --name nginx_app \
  -p 4044:4000 \
  sergiycheck/nginx_app

  else
    echo "nginx exists"
fi