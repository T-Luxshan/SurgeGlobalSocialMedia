## Dockerfile for ReactJS
# Use Node.js v22.11.0 as the base image

FROM node:22.11.0-alpine

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
