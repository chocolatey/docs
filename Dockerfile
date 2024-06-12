FROM node:lts
WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

EXPOSE 5086

CMD [ "yarn", "dev" ]
