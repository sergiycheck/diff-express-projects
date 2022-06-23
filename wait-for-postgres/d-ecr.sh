#!/bin/sh

#all steps 
# https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#getting-started-cli-prereqs

ercRegion='eu-central-1'
accountId=581425740433
username='AWS'

repoName='sergiycheck/nginx_app' # node_app | postgres | sergiycheck/nginx_app
imageName="$repoName:latest"

# get login password
# https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html
# aws ecr get-login-password \
# --region $ercRegion | docker login \
# --username $username --password-stdin \
# $accountId.dkr.ecr.$ercRegion.amazonaws.com


# create repository
# aws ecr create-repository \
#     --repository-name $repoName \
#     --image-scanning-configuration scanOnPush=true \
#     --region $ercRegion


# push image to amazon ecr
# tag image
# docker tag $imageName $accountId.dkr.ecr.$ercRegion.amazonaws.com/$imageName
# push image
# docker push $accountId.dkr.ecr.$ercRegion.amazonaws.com/$imageName


# delete image

# aws ecr batch-delete-image \
#       --repository-name hello-world \
#       --image-ids imageTag=latest \
#       --region region

#delete repo
# aws ecr delete-repository \
#       --repository-name $repoName \
#       --force \
#       --region $ercRegion

# build run docker compose from ecr
# docker compose -f docker-compose.ecr.yml up

