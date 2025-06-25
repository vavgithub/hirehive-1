#!/bin/bash

cd /home/ubuntu/hirehive-1/server

# Fix permissions
chown -R ubuntu:ubuntu /home/ubuntu/hirehive-1

# Run npm install & pm2 under ubuntu's login shell
sudo -u ubuntu bash -lc "cd /home/ubuntu/hirehive-1/server && npm ci && pm2 delete hhv-staging || true && pm2 start npm --name hhv-staging -- run staging && pm2 save"
