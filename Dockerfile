FROM node:lts
WORKDIR /app

RUN git config --global --add safe.directory /app

COPY package.json yarn.lock ./

COPY . .

EXPOSE 5086

CMD [ "yarn", "dev" ]
