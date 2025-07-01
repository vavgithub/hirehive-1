#!/bin/bash
set -e

echo "[start_server] Starting app with PM2 as ubuntu user..."
sudo -u ubuntu bash -lc "
  cd /home/ubuntu/hirehive-1/server && \
  pm2 delete hhv-production || true && \
  pm2 start npm --name hhv-production -- run start && \
  pm2 save
"

