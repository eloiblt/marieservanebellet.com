#!/bin/sh

cd ~/marieservanebellet
git pull

cd ~/marieservanebellet/api
rm -rf node_modules
npm install

cd ~/marieservanebellet/front
rm -rf node_modules
npm install

cd ~/marieservanebellet/front
ng build --prod

cd ~/marieservanebellet/api
tsc

cd /var/www/marieservanebellet_front
rm -r *
cp -r ~/marieservanebellet/front/dist/* .

forever stopall
NODE_ENV=production forever start ~/marieservanebellet/api/dist/app.js
