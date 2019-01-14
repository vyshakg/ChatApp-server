FROM node:10.15.0
WORKDIR /app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY dist .
# EXPOSE 4000
CMD node index.js

