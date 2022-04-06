FROM node:17.8.0

WORKDIR /srv

COPY package* .

RUN npm i

COPY . .

CMD ["npm", "run", "build"]


