FROM node:24-alpine as builder

WORKDIR /app

COPY ./front/package*.json .
RUN npm ci

COPY ./front .
RUN npm run build

# --------------------------------------------------------

FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/dist/msb-front .

EXPOSE 80

CMD ["node", "server/server.mjs"]
