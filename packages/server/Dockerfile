ARG NODE_VERSION=22.19.0

FROM node:$NODE_VERSION-alpine

WORKDIR /app

COPY . .

RUN yarn install --production=true

EXPOSE 3001

CMD ["node", "node_modules/ts-node/dist/bin.js", "index.ts"]
