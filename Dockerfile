# Base Node.js LTS image with dependencies pre-installed
FROM node:lts-slim AS base
# Update npm to latest to avoid ERR_SOCKET_TIMEOUT errors!
RUN npm install -g npm 
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm ci
RUN npx next telemetry disable

# Build image
FROM base AS build
COPY . /app
RUN npm run build

# Production image
FROM base AS app
COPY --from=build /app/next.config.js /app/next.config.js
COPY --from=build /app/public /app/public
COPY --from=build /app/.next /app/.next
ENV NODE_ENV production
RUN npm prune --production
EXPOSE 80
CMD ["npm", "run", "start"]
