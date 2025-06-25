#!/bin/bash
set -e

echo "[start_server] Starting app with PM2..."

sudo -u ubuntu bash -lc "
  cd /home/ubuntu/hirehive-1/server && \
  pm2 delete hhv-staging || true && \
  pm2 start npm --name hhv-staging -- run staging && \
  pm2 save
"
