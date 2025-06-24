#!/bin/bash
cd /home/ubuntu
pm2 restart api || pm2 start npm --name hhv-staging -- run staging
pm2 save
