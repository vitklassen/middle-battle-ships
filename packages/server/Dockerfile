ARG NODE_VERSION=22.19.0

FROM node:$NODE_VERSION-alpine AS builder

RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    linux-headers
    
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn lerna bootstrap

RUN yarn run build --scope=server
RUN yarn run build --scope=client

FROM node:$NODE_VERSION-alpine AS production

WORKDIR /app

COPY --from=builder /app/packages/client/dist /app/client/dist
COPY --from=builder /app/packages/client/ssr-dist /app/client/ssr-dist
COPY --from=builder /app/packages/server/dist /app/server/dist
COPY --from=builder /app/packages/server/package.json /app/server/package.json

RUN cd ./server && yarn install --production=true

EXPOSE 3001

CMD ["node", "./server/dist/index.js"]
