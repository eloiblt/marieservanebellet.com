FROM node:16

ENV NODE_ENV=production
ENV home /usr/src/app

WORKDIR $home

COPY ./ $home
RUN npm install
RUN npm install -g typescript
RUN tsc

EXPOSE 8080
CMD [ "node", "./dist/app.js" ]