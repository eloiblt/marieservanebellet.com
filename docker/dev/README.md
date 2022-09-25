# Lancement en local avec les données à jour

Pour lancer le docker-compose.yml, il faut 2 volumes nommés :

- mongo-volume
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
docker run --rm --volume [mongo-volume-name]:/dbdata --volume $(pwd):/backup ubuntu tar cvf /backup/mongo-volume.tar /dbdata
docker run --rm --volume [pictures-volume-name]:/dbdata --volume $(pwd):/backup ubuntu tar cvf /backup/pictures-volume.tar /dbdata
```

- De retour sur la machine cliente, télécharger ces 2 .tar :

```sh
scp [name]@[IP]:mongo-volume.tar .
scp [name]@[IP]:pictures-volume.tar .
```

- Restaurer ces volumes dans docker :

```sh
docker run --rm --volume mongo-volume:/dbdata --volume $(pwd):/backup ubuntu tar xvf /backup/mongo-volume.tar -C /dbdata --strip 1
docker run --rm --volume pictures-volume:/dbdata --volume $(pwd):/backup ubuntu tar xvf /backup/pictures-volume.tar -C /dbdata --strip 1
```

- Lancer le docker compose