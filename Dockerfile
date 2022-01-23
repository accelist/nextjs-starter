FROM node:16-slim AS build
COPY . /app
WORKDIR /app
RUN npm ci
RUN npm run build

# Production
FROM node:16-slim AS app
COPY --from=build /app/next.config.js ./app/next.config.js
COPY --from=build /app/public ./app/public
COPY --from=build /app/.next ./app/.next
COPY --from=build /app/package.json ./app/package.json
COPY --from=build /app/package-lock.json ./app/package-lock.json
WORKDIR /app
ENV NODE_ENV production
RUN npm ci --production
EXPOSE 80
RUN npx next telemetry disable
CMD ["npm", "run", "start"]
