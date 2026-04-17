FROM node:25-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run seed

EXPOSE 8000

CMD [ "npm","run","start" ]