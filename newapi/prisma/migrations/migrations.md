# Migrations with Prisma

## Prisma fonctionne en à partir de la modification manuelle du schema.prisma, il génère tout seul le client après

### Create the migration file from prisma.client, execute it on database, and generate prisma client (DEV only)
```sh
npx prisma migrate dev --name "init"
```

### Crée une nouvelle migration vide
```sh
npx prisma migrate dev --create-only
```

### Seed data in prisma/seed.ts (DEV only)
```sh
npx prisma db seed
```

### Drop database, reapply migrations and seed database
```sh
npx prisma migrate reset
```

### Apply migrations in production (better in CI/CD pipeline)
```sh
npx prisma migrate deploy
```

