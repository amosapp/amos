FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install --quiet
COPY . .

EXPOSE 80 4000 4001

RUN npm run build
CMD npm run start:prod