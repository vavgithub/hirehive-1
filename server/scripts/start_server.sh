#!/bin/bash
set -e

kill_root_on_8008() {
  PID=$(sudo lsof -ti:8008) || true
  if [ -n "$PID" ]; then
    OWNER=$(ps -o user= -p "$PID" | tr -d ' ')
    if [ "$OWNER" = "root" ]; then
      echo "[start_server] Killing root-owned process on port 8008 (PID: $PID)"
      sudo kill -9 "$PID"
    else
      echo "[start_server] Port 8008 is used by user '$OWNER'. Not killing."
    fi
  else
    echo "[start_server] No process on port 8008"
  fi
}

echo "[start_server] Killing rogue root process on port 8008 BEFORE PM2..."
kill_root_on_8008

echo "[start_server] Starting app with PM2 as ubuntu user..."
sudo -u ubuntu bash -lc "
  cd /home/ubuntu/hirehive-1/server && \
  pm2 delete hhv-staging || true && \
  pm2 start npm --name hhv-staging -- run staging && \
  pm2 save
"

echo "[start_server] Waiting 3s in case any rogue process respawned..."
sleep 3

echo "[start_server] Killing rogue root process on port 8008 AFTER PM2 start..."
kill_root_on_8008
