FROM alpine:edge

RUN apk update

RUN apk add nodejs npm

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
