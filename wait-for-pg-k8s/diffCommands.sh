#!/bin/sh

#connect to pg db
#command docker exec -it some-postgres-dev psql -U postgres

# use container which ships with a lot of tools that are useful 
# for troubleshooting or debugging networking issues.
# link https://github.com/nicolaka/netshoot
# command docker run -it --network web-app-network nicolaka/netshoot

#run & build docker-compose dev
# exec docker-compose -f docker-compose.dev.yml up --build

#run & build docker-compose test start

# runs tests and gracefully exit

# Steps

# 1 starting postgres db in network ${__dirname}_default
# command docker-compose -f docker-compose.test.yml up -d postgress_db_test

# 2 running test command with docker-compose in backend_app_test service
# command docker-compose -f docker-compose.test.yml run --rm backend_app_test npm run test:e2e

#clean 
# command docker-compose -f docker-compose.test.yml down --volumes

#run & build docker-compose test end

#run & build docker-compose prod
# exec docker-compose build
# exec docker-compose up --build

#clean
# exec docker-compose down --volumes

# remove all containers
# exec docker rm -f $(docker ps -a -q)

#remove all volumes
# exec docker volume rm $(docker volume ls -q)

#building for deploy start

#access volume created by docker
# sudo chown -R dev ./pg-db-data




#building for deploy start end

# build image with tag of docker hub repo
# exec docker build -f Dockerfile -t sergiycheck/node_app .

#push image 
# exec docker push sergiycheck/node_app

# set image in docker-compose file

#deploy for ecs start

#use context that configured with aws account 
# command docker context use myecscontext

# deploy to aws ecs
# command docker compose -f docker-compose.prod.yml up

# generate CloudFormation stack
# command docker compose  -f docker-compose.prod.yml convert > stack.yml

# revert to use default context
# command docker context use default

#deploy for ecs end

# run docker compose with proxy and load balancer
# nginx or other server must be configured!
# exec docker-compose up --build  --scale backend_app=2
