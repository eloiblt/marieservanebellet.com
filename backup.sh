#!/bin/sh

cd ~/marieservanebellet/

rm -r mongodump
rm -r photosdump

mongodump --db marieservanebellet -o mongodump --authenticationDatabase admin --username eloiblt

zip -r mongodump.zip mongodump
rm -r mongodump

zip -r photosdump /var/www/marieservanebellet_pictures

git add .
git commit -m "update backup"
git push origin master