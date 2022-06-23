#!/bin/sh

instanceName='ubuntu@ec2-54-93-193-33.eu-central-1.compute.amazonaws.com'

# set permission for wait_for_pg_linux_key_pair.pem
# chmod 400 wait_for_pg_linux_key_pair.pem

# connect to the instance {
# eval agent and add <name>.pem

ssh -i ./wait_for_pg_linux_key_pair.pem \
$instanceName

# sudo apt update
# install docker from official docs on aws ubuntu
# mkdir wait_for_pg_app

# transfer docker compose file
# scp -i ./wait_for_pg_linux_key_pair.pem \
# ./docker-compose.ecr.yml \
# $instanceName:wait_for_pg_app/

# transfer entrypoint
# scp -i ./wait_for_pg_linux_key_pair.pem \
# ./entrypoint.sh \
# $instanceName:wait_for_pg_app/

# }


