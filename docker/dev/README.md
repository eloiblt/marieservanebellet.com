Restore 

```bash
cd docker/dev
docker exec -i $(docker ps -qf "name=db") psql -U admin msb < msb-db-backup-20250617_0300.sql
```