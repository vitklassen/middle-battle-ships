ARG NODE_VERSION=22.19.0

FROM node:$NODE_VERSION-alpine AS builder

WORKDIR /app

COPY . .
RUN yarn install
RUN yarn run build

FROM node:$NODE_VERSION-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json

RUN yarn install --production=true

EXPOSE 3001

CMD ["yarn", "run", "preview"]
