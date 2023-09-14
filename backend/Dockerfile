# From base image
FROM node:18-alpine

EXPOSE 8080

#WORKDIR /home/node/app

COPY ./index.js .
COPY ./package.json .
COPY ./yarn.lock .

# RUN apk update && apk add git

RUN yarn install --production
# RUN [ "yarn", "install", "--production" ]

ENTRYPOINT [ "node", "index.js"]
