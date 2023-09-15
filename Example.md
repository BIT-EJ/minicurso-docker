# Docker example

## Setting up a database

[Postgres Official Docs](https://hub.docker.com/_/postgres)

### Via Docker CLI

```bash
#!/usr/bin/env sh

docker run -d \
    --name "container-name" \
    -e POSTGRES_USER="bit" \
    -e POSTGRES_PASSWORD="mysecretpassword" \
    -e POSTGRES_DB="exemplo" \
    -e PGDATA="/var/lib/postgresql/data/pgdata" \
    -p "5432:5432" \
    -v "/var/tmp/postgres:/var/lib/postgresql/data" \
    postgres:alpine
```

### Via Compose

```yaml
# file: docker-compose.yaml
services:
  database:
    image: postgres:alpine
    restart: unless-stopped
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=bit
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_DB=exemplo
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - pg:/var/lib/postgresql/data
    networks:
      - my_network
volumes:
  pg:
networks:
  my_network:
```

## Extending an image (builing our own)

> Using the example's "backend"

```dockerfile
# file: Dockerfile

FROM node:18-alpine

EXPOSE 8080

#WORKDIR /home/node/app

COPY ./index.js .
COPY ./package.json .
COPY ./yarn.lock .

# RUN apk update && apk add git

# RUN [ "yarn", "install", "--production" ]
RUN yarn install --production

ENTRYPOINT [ "node", "index.js"]
```

## Its all coming together

```yaml
services:
  backend:
    build: ./backend
    restart: on-failure:10
    ports:
      - 8080:8080
    environment:
      - PORT=8080
      - POSTGRES_USER=bit
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_DB=exemplo
      - POSTGRES_HOST=database
    depends_on:
      - database
    networks:
      - my_network
  database:
    image: postgres:alpine
    restart: unless-stopped
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=bit
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_DB=exemplo
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - pg:/var/lib/postgresql/data
    networks:
      - my_network
volumes:
  pg:
networks:
  my_network:
```

## Now with `.env`

```shell
# file: .env
PORT=8080
POSTGRES_USER=bit
POSTGRES_PASSWORD=mysecretpassword
POSTGRES_DB=exemplo
POSTGRES_HOST=database
PGDATA=/var/lib/postgresql/data/pgdata
```
