# The first stage
# Build React static files
FROM node:16.18.1-alpine as build

WORKDIR /app/frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --silent
COPY ./ ./
RUN npm run build
