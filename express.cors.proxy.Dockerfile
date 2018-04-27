FROM node:carbon

WORKDIR /usr/src/app

COPY docker/node-cors-proxy/package*.json ./
COPY docker/node-cors-proxy/index.js ./
RUN npm install

EXPOSE 8585
CMD [ "npm", "start" ]