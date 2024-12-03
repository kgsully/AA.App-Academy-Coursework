# FROM ubuntu

# ADD . /app

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN DEBIAN_FRONTEND=noninteractive apt-get install -y npm nodejs
# RUN apt-get install -y openssh-server nginx
# RUN cd /app && npm install

# CMD sshd & cd /app && npm start

FROM node:16.20.2-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm install \
    && npm cache clean --force

EXPOSE 3000

COPY . .

CMD ["npm", "start"]
