FROM node:current-alpine3.17 AS BUILDER
WORKDIR /app
COPY package.json package-lock.json .env ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --prod

FROM node:current-alpine3.17
USER node:node
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
CMD ["node", "-r", "dotenv/config", "build"]