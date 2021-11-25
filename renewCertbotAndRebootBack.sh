certbot renew --dry-run
su eloiblt
forever stopall
NODE_ENV=production forever start /home/eloiblt/marieservanebellet/api/dist/app.js
exit
systemctl restart apache2
