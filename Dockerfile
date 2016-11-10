FROM node:6

EXPOSE 9000

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY . /usr/app

RUN npm install

CMD [ "npm", "start" ]
