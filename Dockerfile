FROM node:14-buster-slim AS builder
COPY . /app
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# Production
FROM node:14-buster-slim AS runner
COPY --from=builder /app/next.config.js ./app/next.config.js
COPY --from=builder /app/public ./app/public
COPY --from=builder /app/.next ./app/.next
COPY --from=builder /app/package.json ./app/package.json
COPY --from=builder /app/pnpm-lock.yaml ./app/pnpm-lock.yaml
WORKDIR /app
ENV NODE_ENV production
RUN npm install -g pnpm
RUN pnpm install -P
EXPOSE 80
RUN pnpx next telemetry disable
CMD ["pnpm", "start"]
