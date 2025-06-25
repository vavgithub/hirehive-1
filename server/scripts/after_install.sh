#!/bin/bash
cd /home/ubuntu/hirehive-1
mv .env.staging.bak server/.env.staging || true
cd server
npm ci