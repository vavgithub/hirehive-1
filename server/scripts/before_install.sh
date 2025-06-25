#!/bin/bash
cd /home/ubuntu/hirehive-1
cp server/.env.staging .env.staging.bak || true
rm -rf server
mkdir -p server