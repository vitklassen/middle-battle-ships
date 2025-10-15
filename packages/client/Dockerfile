ARG NODE_VERSION=22.19.0

# Development stage
FROM node:$NODE_VERSION-alpine AS development
RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    git \
    linux-headers
RUN corepack enable
WORKDIR /app

COPY package.json ./
RUN yarn install --production=false

COPY . .

EXPOSE 3000
CMD ["node", "./node_modules/vite/bin/vite.js", "--host", "0.0.0.0"]

# Production stage
FROM node:$NODE_VERSION-alpine AS build
RUN apk add --no-cache \
    python3 \
    py3-pip \
    build-base \
    git \
    linux-headers
RUN corepack enable
WORKDIR /app

COPY package.json ./
RUN yarn install --production=false

COPY . .
RUN node node_modules/vite/bin/vite.js build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
