#!/bin/bash
set -e

echo "[start_server] Checking and killing rogue process on port 8008 (if any)..."
PID=$(sudo lsof -ti:8008) || true
if [ -n "$PID" ]; then
  echo "[start_server] Killing PID $PID"
  sudo kill -9 "$PID"
else
  echo "[start_server] No process found on port 8008"
fi

echo "[start_server] Starting app with PM2 as ubuntu user..."
sudo -u ubuntu bash -lc "
  cd /home/ubuntu/hirehive-1/server && \
  pm2 delete hhv-staging || true && \
  pm2 start npm --name hhv-staging -- run staging && \
  pm2 save
"
