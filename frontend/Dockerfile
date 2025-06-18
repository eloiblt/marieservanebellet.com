FROM node:24-alpine as builder

WORKDIR /app

COPY ./package*.json .
RUN npm ci

COPY . .
RUN npm run build

# --------------------------------------------------------

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/dist/msb-frontend .

EXPOSE 80

CMD ["node", "server/server.mjs"]
