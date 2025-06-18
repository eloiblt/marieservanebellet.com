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

COPY ./api/package*.json .
COPY ./api/prisma ./prisma
RUN npm ci --only=production

COPY --from=builder /app/dist/ .

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]