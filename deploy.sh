#!/bin/sh

cd /var/www/marieservanebellet.com/marieservanebellet
git pull

cd /var/www/marieservanebellet.com/marieservanebellet/api
rm -rf node_modules
npm install

cd /var/www/marieservanebellet.com/marieservanebellet/front
rm -rf node_modules
npm install

cd /var/www/marieservanebellet.com/marieservanebellet/front
ng build --prod

cd /var/www/marieservanebellet.com/marieservanebellet/api
tsc

cd /var/www/marieservanebellet.com/public_html
rm -r *
cp -r /var/www/marieservanebellet.com/marieservanebellet/front/dist/* .

forever stopall
NODE_ENV=production forever start /var/www/marieservanebellet.com/marieservanebellet/api/dist/app.js
cd /var/www/marieservanebellet.com/pictures/
forever start ftp.js
