#!/bin/bash

cd /home/ubuntu/hirehive-1/server

echo "Starting app as ubuntu user"
sudo -u ubuntu bash -lc "
  cd /home/ubuntu/hirehive-1/server && \
  pm2 delete hhv-staging || true && \
  pm2 start npm --name hhv-staging -- run staging && \
  pm2 save"
