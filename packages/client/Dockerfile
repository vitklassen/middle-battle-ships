# Development stage
FROM node:20-alpine AS development
RUN corepack enable
WORKDIR /app

COPY package.json ./
RUN yarn install --production=false

COPY . .

EXPOSE 3000
CMD ["node", "./node_modules/vite/bin/vite.js", "--host", "0.0.0.0"]

# Production stage
FROM node:20-alpine AS build
RUN corepack enable
WORKDIR /app

COPY . .
RUN yarn install --production=true
RUN yarn run build:client

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
