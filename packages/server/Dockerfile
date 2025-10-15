ARG NODE_VERSION=22.19.0

FROM node:$NODE_VERSION-alpine AS base
RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    git \
    linux-headers

WORKDIR /app

FROM base AS builder

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap
RUN yarn build --scope=client
RUN yarn build --scope=server

FROM node:$NODE_VERSION-alpine AS production
WORKDIR /app

COPY --from=builder /app/packages/server/dist/ /app/packages/server/dist/
COPY --from=builder /app/packages/client/ssr-dist /app/packages/client/ssr-dist
COPY --from=builder /app/packages/client/dist /app/packages/client/dist
COPY --from=builder /app/packages/server/package.json /app/package.json
RUN yarn install --production=true

EXPOSE $SERVER_PORT
CMD [ "node", "/app/packages/server/dist/index.js" ]
 