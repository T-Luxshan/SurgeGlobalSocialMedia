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


# .dockerignore File shouldbe created, 
# .env
# node_modules

# docker run -p 3000:3000 --name surge-react-app --env-file .env surge_frontend