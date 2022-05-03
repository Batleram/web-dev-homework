FROM node:17.8.0

WORKDIR /srv

COPY package* ./

RUN npm i

COPY . .

ENV GENERATE_SOURCEMAP=false

ENV DISABLE_ESLINT_PLUGIN=true


CMD ["npm", "run", "build"]


