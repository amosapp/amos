FROM node:latest

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install --quiet
COPY . .

# WORKDIR /common
# COPY common .

EXPOSE 3000

RUN npm run build
CMD npm run start:prod
# WORKDIR /app
# RUN npm run build
# CMD npm run start:prod
