
FROM node:22-alpine


WORKDIR /usr/src/app

RUN npm install nodemon

COPY package*.json ./
RUN npm install




COPY . .



EXPOSE 3000


CMD ["npm", "run", "dev"]