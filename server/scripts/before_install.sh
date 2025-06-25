#!/bin/bash

set -e

echo "Backing up existing .env.staging"

# Backup .env.staging (if exists)
cp /home/ubuntu/hirehive-1/server/.env.staging /home/ubuntu/hirehive-1/.env.staging.bak || true

echo "Fixing ownership of server directory"
sudo chown -R ubuntu:ubuntu /home/ubuntu/hirehive-1/server

echo "Cleaning old server files"
rm -rf /home/ubuntu/hirehive-1/server/*
