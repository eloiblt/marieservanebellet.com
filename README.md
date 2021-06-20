# Serveur

```sh
ssh eloiblt@193.70.40.152
```

Le projet est clone dans `/home/eloiblt/marieservanebellet`  

Serveur APACHE avec deux virtual hosts : 
- marieservanebellet_front
- marieservanebellet_pictures

## marieservanebellet_front

Code : /var/www/marieservanebellet_front  
Configuration : /etc/apache2/sites-available/marieservanebellet_front.conf  

```sh
<VirtualHost *:80>
    ServerName marieservanebellet.com
    Redirect / https://marieservanebellet.com/
RewriteEngine on
RewriteCond %{SERVER_NAME} =marieservanebellet.com
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
    ServerAdmin webmaster@localhost
    ServerName marieservanebellet.com
    ServerAlias marieservanebellet.com
    DocumentRoot /var/www/marieservanebellet_front
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/marieservanebellet.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/marieservanebellet.com/privkey.pem

    <Directory /var/www/marieservanebellet_front>
        RewriteEngine on

        # Don't rewrite files or directories
        RewriteCond %{REQUEST_FILENAME} -f [OR]
        RewriteCond %{REQUEST_FILENAME} -d
        RewriteRule ^ - [L]

        # Rewrite everything else to index.html to allow HTML5 state links
        RewriteRule ^ index.html [L]
    </Directory>
</VirtualHost>
```

80 et 443, redirige vers 443  
SSL On  

Pour réappliquer une configuration : 

```sh
sudo a2ensite marieservanebellet_front.conf
sudo systemctl restart apache2
```

## marieservanebellet_pictures

Code : /var/www/marieservanebellet_pictures  
Configuration : /etc/apache2/sites-available/marieservanebellet_pictures.conf  

```sh
<VirtualHost *:5001>
    ServerAdmin webmaster@localhost
    ServerName marieservanebellet.com
    ServerAlias marieservanebellet.com
    DocumentRoot /var/www/marieservanebellet_pictures
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    SSLEngine on
    Include /etc/letsencrypt/options-ssl-apache.conf
    SSLCertificateFile /etc/letsencrypt/live/marieservanebellet.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/marieservanebellet.com/privkey.pem
</VirtualHost>
```

5001  
SSL On

Pour réappliquer une configuration : 

```sh
sudo a2ensite marieservanebellet_pictures.conf
sudo systemctl restart apache2
```

## marieservanebellet_api

/home/eloiblt/marieservanebellet/api/dist/app.js  
3000  

```sh
# compiler
tsc

# lancer en daemon
NODE_ENV=production forever start /home/eloiblt/marieservanebellet/api/dist/app.js  
```

## database

MONGODB  
mongodb://eloiblt:10bLt!mo731$@193.70.40.152:27017/marieservanebellet  
Port 27017 non exposé sur l'extérieur  

Configuration : /etc/mongodb.conf  
Accepter des connexions de l'exterieur : bind_ip = 127.0.0.1,193.70.40.152  
Set auth to true !  

```sh
mongo -u eloiblt -p --authenticationDatabase admin
```

sudo systemctl restart mongodb

## certbot

/etc/letsencrypt/live/marieservanebellet.com/fullchain.pem
/etc/letsencrypt/live/marieservanebellet.com/privkey.pem

```sh
# statut du renouvellement automatique
sudo systemctl status certbot.timer

# renouveller
sudo certbot renew --dry-run

# refournit un certificat
sudo certbot --apache -d marieservanebellet.com
```

Redémarrer le back et apache après cela. 

## .zshrc

```sh
export FRONT_URL="https://marieservanebellet.com"
export DATABASE_URL="mongodb://eloiblt:10bLt!mo731\$@193.70.40.152:27017/marieservanebellet"
export JWT_SECRET="1341K3;/3/.3DSFDfsdf"
export SMTP_MAIL="marieservanebellet.site@gmail.com"
export SMTP_PASSWORD="MwebSitB!"
export MAIL_TO="eloi.bellet@gmail.com"
export MAIL_BCC="eloi.bellet@gmail.com"
```

# Développement local

- Ouvrir le port 27017 sur le serveur de prod (accès à la base de données de prod)

```sh
sudo ufw allow 27017

# a la fin
sudo ufw status numbered
sudo ufw delete [x]
```

- npm start sur les deux projets


