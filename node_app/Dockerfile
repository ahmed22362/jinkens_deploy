FROM node:18

WORKDIR /usr/src/app

COPY node_app/package*.json ./
RUN npm install --production

COPY node_app/ .

EXPOSE 3000
CMD ["npm", "start"]
