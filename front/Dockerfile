FROM node:16 as builder

WORKDIR /app

COPY ./front/package*.json ./
RUN npm ci

COPY ./front/ $home
RUN npm run build


FROM nginx:alpine

COPY ./front/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]