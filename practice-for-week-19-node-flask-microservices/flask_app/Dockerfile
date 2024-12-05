FROM python:3.9-slim

EXPOSE 5000

WORKDIR /app

# COPY . .

COPY ./requirements.txt ./

COPY ./entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh
