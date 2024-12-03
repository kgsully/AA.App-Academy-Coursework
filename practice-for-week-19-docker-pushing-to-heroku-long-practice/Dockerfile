FROM node:16.20.2-alpine3.18

WORKDIR /app

COPY ./wait-for .

COPY ./backend/ .

COPY ./frontend/build/ ./public
RUN chmod +x ./bin/www

ENV NODE_ENV=production
ENV JWT_SECRET="aaa967f1-2b08-4dde-a086-5df6bc8eff91"
ENV JWT_EXPIRES_IN=604800

CMD [ "npm", "start" ]
