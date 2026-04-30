FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PWD=qwerty

EXPOSE 3000

CMD ["npm", "run", "start:dev"]