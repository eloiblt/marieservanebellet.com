FROM node:16 as build

ENV home /usr/src/app

WORKDIR $home

COPY ./front/ $home
RUN npm install
RUN npm run build



FROM nginx:latest

ENV home /usr/src/app

WORKDIR $home

COPY ./front/nginx.conf /etc/nginx/nginx.conf
COPY --from=build $home/dist /usr/share/nginx/html
EXPOSE 80