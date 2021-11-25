#!/bin/sh

cd ~/marieservanebellet/

rm mongodump.zip
rm photosdump.zip

mongodump --db marieservanebellet -o mongodump --authenticationDatabase admin --username eloiblt -p "10bLt!mo731$"

zip -r mongodump.zip mongodump
rm -r mongodump

zip -r photosdump /var/www/marieservanebellet_pictures

git add .
git commit -m "update backup"
git push origin master
