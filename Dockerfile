FROM node:22-alpine

WORKDIR /app

COPY package.* .

RUN npm install

COPY . .

ENV PORT=4000
ENV HOST=0.0.0.0

EXPOSE 4000

CMD ["node", "main.js"]