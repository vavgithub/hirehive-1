#!/bin/bash
echo "Backing up existing .env.staging"
cp /home/ubuntu/hirehive-1/server/.env.staging /home/ubuntu/hirehive-1/.env.staging.bak || true
rm -rf /home/ubuntu/hirehive-1/server/*
