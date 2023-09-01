# Lancement en local avec les données à jour

Pour lancer le docker-compose.yml, il faut 2 volumes nommés :

- db-volume
- pictures-volume

Ils sont marqués external car on dit à docker compose de les prendre sur la machine hôte.

Pour cela : 

- Connexion en SSH sur le serveur de Prod 
- Lire les noms de ces 2 volumes : 

```sh
docker volume ls
```

- Exporter ces 2 volumes en .tar

```sh
docker run --rm --volume db-volume:/dbdata --volume $(pwd):/backup ubuntu tar cvf /backup/db-volume.tar /dbdata
docker run --rm --volume pictures-volume:/dbdata --volume $(pwd):/backup ubuntu tar cvf /backup/pictures-volume.tar /dbdata
```

- De retour sur la machine cliente, télécharger ces 2 .tar :

```sh
scp [name]@[IP]:db-volume.tar .
scp [name]@[IP]:pictures-volume.tar .
```

- Restaurer ces volumes dans docker, via WSL2 ! :

```sh
docker run --rm --volume db-volume:/dbdata --volume $(pwd):/backup ubuntu tar xvf /backup/db-volume.tar -C /dbdata --strip 1
docker run --rm --volume pictures-volume:/dbdata --volume $(pwd):/backup ubuntu tar xvf /backup/pictures-volume.tar -C /dbdata --strip 1
```

- Lancer le docker compose