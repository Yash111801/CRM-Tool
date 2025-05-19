# backend/Dockerfile
FROM node:18
COPY package*.json ./
RUN npm install --production
RUN npm install -g nodemon
COPY .env.production .env
COPY . .
CMD ["node", "index.js"]
