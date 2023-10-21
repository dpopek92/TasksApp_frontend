FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/scr/app

COPY package.json ./ 

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]