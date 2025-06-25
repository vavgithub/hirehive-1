#!/bin/bash

echo "Restoring .env.staging"
mv /home/ubuntu/hirehive-1/.env.staging.bak /home/ubuntu/hirehive-1/server/.env.staging || true

echo "Fixing ownership"
chown -R ubuntu:ubuntu /home/ubuntu/hirehive-1
