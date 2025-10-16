FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY package.json ./

RUN yarn install --production=false

COPY . .

EXPOSE 3001

CMD ["node", "node_modules/ts-node/dist/bin.js", "index.ts"]
