#!/bin/sh

docker build -t sergiycheck/nginx_app ./nginx

docker build -t sergiycheck/node_app .
