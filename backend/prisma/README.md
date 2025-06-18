# Prisma

## Migrations

```bash
# après avoir modifié schema.prisma 
npx prisma generate 

# generate migration dev
npx prisma migrate dev --name <migration_name>

# apply migrations prod
npx prisma migrate deploy
```

## Après un clone

```bash
# Génère le client Prisma (@prisma/client) selon le fichier schema.prisma.
npx prisma generate
```

## Init

```bash
# Crée un dossier prisma/ avec un fichier schema.prisma et configure .env.
npx prisma init
```

## Reset

```bash
npx prisma migrate reset
```
