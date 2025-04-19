# Turborepo starter with shadcn/ui

Tutor Docker. Pastiin kalian ada root folder project

## Build Duls

```bash
docker build --build-arg NEXT_PUBLIC_BASE_API=https://base_api --build-arg NEXT_PUBLIC_BASE_URL=http://base_url -t hktekno/weekcan
 -f apps/weekcan/Dockerfile .
```

## Run it!

```bash
docker run -p 3000:3000 --env-file .env hktekno/weekcan
```

:)
