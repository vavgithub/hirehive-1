#!/bin/bash

echo "Restoring .env.staging"
mv /home/ubuntu/hirehive-1/.env.staging.bak /home/ubuntu/hirehive-1/server/.env.staging || true
