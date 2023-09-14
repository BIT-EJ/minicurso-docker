#!/usr/bin/env sh

docker run -d \
    --name container-name \
    -e POSTGRES_USER=bit \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -e POSTGRES_DB=exemplo \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -p 5432:5432 \
    postgres:alpine
    # -v /custom/mount:/var/lib/postgresql/data \