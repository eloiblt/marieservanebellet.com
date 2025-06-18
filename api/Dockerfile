FROM node:24-alpine AS builder

WORKDIR /app

COPY ./api/package*.json .
RUN npm ci

COPY ./api .
RUN npm run build

# --------------------------------------------------------

FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache openssl
RUN npm install -g prisma

COPY --from=builder /app/package*.json .
COPY --from=builder /app/prisma prisma
COPY --from=builder /app/dist dist
COPY --from=builder /app/node_modules node_modules

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]