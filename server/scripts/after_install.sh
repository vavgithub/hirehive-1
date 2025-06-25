#!/bin/bash
set -e

echo "[after_install] Restoring .env.staging..."
mv /home/ubuntu/hirehive-1/.env.staging.bak /home/ubuntu/hirehive-1/server/.env.staging || true

echo "[after_install] Installing node modules on EC2..."
cd /home/ubuntu/hirehive-1/server
sudo -u ubuntu bash -lc "cd /home/ubuntu/hirehive-1/server && npm install"
