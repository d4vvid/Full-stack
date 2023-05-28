#syntax=docker/dockerfile:1
# Autor: Dawid Pawelec
FROM node:18-alpine AS build
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/local/app
COPY --from=build node_modules ./node_modules
COPY --from=build dist ./dist
CMD ["node", "./dist/app.js"]