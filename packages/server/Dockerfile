FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY . .

RUN yarn install --production=true

EXPOSE 3001

CMD ["node", "node_modules/ts-node/dist/bin.js", "index.ts"]
