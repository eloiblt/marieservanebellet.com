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

cd public_html
rm -r *
cp -r /var/www/marieservanebellet.com/marieservanebellet/front/dist/* .

cd /var/www/marieservanebellet.com/marieservanebellet/api
set NODE_ENV=production forever start ./dist/app.js


