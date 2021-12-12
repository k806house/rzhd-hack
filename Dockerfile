FROM node:17.1.0-alpine
 
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . /app
 
EXPOSE 3000
 
CMD ["npm", "run", start"]