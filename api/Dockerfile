FROM node:16

ENV NODE_ENV=production
ENV home /usr/src/app

WORKDIR $home

COPY ./api/ $home
RUN npm install
RUN npm install -g typescript
RUN apt update && apt install jpegoptim
RUN tsc

EXPOSE 80
CMD [ "node", "./dist/app.js" ]