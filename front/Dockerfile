
FROM node:16 as build

ENV home /usr/src/app

WORKDIR $home

COPY ./front/ $home
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist /usr/share/nginx/html
EXPOSE 80