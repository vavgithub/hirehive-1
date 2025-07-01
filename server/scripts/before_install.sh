#!/bin/bash
set -e

echo "[before_install] Backing up .env.production..."
cp /home/ubuntu/hirehive-1/server/.env.production /home/ubuntu/hirehive-1/.env.production.bak || true

echo "[before_install] Fixing ownership..."
sudo chown -R ubuntu:ubuntu /home/ubuntu/hirehive-1/server

echo "[before_install] Cleaning server directory..."
rm -rf /home/ubuntu/hirehive-1/server/*
