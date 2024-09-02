FROM node:20

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]