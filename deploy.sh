#!/bin/sh

cd /var/www/marieservanebellet.com/marieservanebellet/api
rm -r node_modules
npm install

cd /var/www/marieservanebellet.com/marieservanebellet/api
rm -r node_modules
npm install

cd /var/www/marieservanebellet.com/marieservanebellet/front
ng build --prod

cd /var/www/marieservanebellet.com/marieservanebellet/api
tsc

cd /var/www/marieservanebellet.com/public_html
rm -r *
cp -r /var/www/marieservanebellet.com/marieservanebellet/front/dist/* .

set NODE_ENV=production forever start ./dist/app.js


