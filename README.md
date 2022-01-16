# Serveur

```sh
ssh ubuntu@193.70.40.152
efhPDErZx64X
```

Le projet est clone dans `/home/eloiblt/marieservanebellet`  

# Mails

Utilisation de mailjet

Host : in-v3.mailjet.com:465  
User : 60bbed0d58887a4b43a7fea769ffd756  
Password : 4d13e8169dd6bff0551e1a86bd4b698e  
TLS true

Informations du compte Google :

marieservanebellet.site@gmail.com  
MwebSitB!  

# SSL 

Créer le certificat la 1ère fois (si pas de dossier ssl):
- docker system prune
- lancer le reverse proxy en commentant la partie https (sinon ça va planter vu qu'il n'y a pas de certificats), et sans les depends-on tant qu'à faire

  ```sh
  docker-compose up -d reverse-proxy
  ```
- commenter la ligne entrypoint pour certbot (empeche execution commande suivante)
- Lancer la commande pour générer le certificat dans ssl/live
```sh
docker-compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --email eloi.bellet@gmail.com --agree-tos --no-eff-email -d marieservanebellet.com -d www.marieservanebellet.com
```

C'est normal que le dossier ssl/live soit vide sous un OS Linux car il appartient à root
- mais vérifier que le certificat est bien dans nginx ??
- stopper tous les containers
- décommenter le nginx.conf du reverse-proxy
- décommenter la ligne entrypoint pour certbot
- Déployer 

```sh
docker-compose up --build
``` 

Le renew est automatique et le reload de la configuration nginx est automatique
