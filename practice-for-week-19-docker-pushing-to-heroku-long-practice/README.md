# Pushing to Heroku: Using Node.js and React

In this project, you'll be walking through the steps to Docker-ize an 
application and deploy that application to the **Heroku Container Registry**. 

The application you'll be using for this demo will look pretty familiar - it's
Pokedex! You'll create a Dockerfile to create the Docker image for the web 
application (Node.js, Express, and React) and a Docker Compose file to configure 
the containers for the web application and database (PostgreSQL) services.

In order to keep this project focused on Heroku, you're going to leverage
a skill you know well - using your local machine to install JS dependencies
and build React. This will allow you to do simple copies into Docker. You will 
have opportunities in other activities to work on the best practices for 
installing and building within Docker.

## Phase 0: Prepare the projects

The provided starter project exactly matches the solution to Pokedex for both 
the backend (Node.js with Express) and frontend (React with hooks). It also 
includes a bonus file, _wait-for_ which is useful with Docker to allow the 
backend to wait for the database before it starts. You will dig deeper into 
_wait-for_ in other activities.

Complete the following tasks before moving onto the next phase:

* Install all dependencies for the backend.
* Install all dependencies for the frontend.
* Build the React frontend.

## Phase 1: Running the application locally using Docker

It's always best to work where you can test and modify quickly and easily.
In this case, it means creating and verifying the docker configuration locally.

### Dockerfile Part 1 - Backend

You'll start by building the **Dockerfile** and loading the Node.js (backend) 
side of things. You have walked through this before, so it should seem familiar.

Create a new _Dockerfile_ in the root of your project and enter these 
statements with appropriate values. There is one new statement that you can 
copy and paste as-is to include `wait-for` in your container.

* `FROM` alpine with the node version matching your system
* `WORKDIR` of your choosing
* `COPY ./wait-for .` put this as shown on the line after `WORKDIR`
* `COPY` the _contents_ of the `backend` folder to the root of the working
  directory
* `ENV` to define the following environment variable keys and values (see the
  [Docker documentation][docker env replacement] for more information):

```
NODE_ENV=production
JWT_SECRET=aaa967f1-2b08-4dde-a086-5df6bc8eff91
JWT_EXPIRES_IN=604800
```

* And lastly, `CMD` to run the `npm start` command.


The environment variable for the database configuration (i.e. `DATABASE_URL`)
needs to be able to be set dynamically by Heroku so you're omitting it from the
image configuration. When running the application locally, you'll define the
`DATABASE_URL` environment variable in the Docker Compose file (which you'll do
later in this project).

The `CMD` statement is required by Heroku. In your Docker Compose file, you'll
use a different approach to run your application locally.

### Testing

It's best to build and verify in bite-sized steps when possible, so do that now.
Build the image. Verify it is working by connecting to a container running this 
image. Use `ls` to inspect the contents. (Keep reading for additional hints.)

**Reminders**

* `docker build . -t` allows you to tag your build to more easily reference it
* `docker container run` accepts a number of useful flags, including 
  * `-it` which allows a command after the image name such as `/bin/sh`
* `ls` lists all files and folders
* `exit` logs out of a shell connection (like to a docker container)

The goal is to see the files and folders which were copied from _backend_ 
including _node_modules_ and _wait-for_.

```plaintext
/app # ls -la
total 144
drwxr-xr-x    1 root     root          4096 Jun  3 02:55 .
drwxr-xr-x    1 root     root          4096 Jun  3 02:56 ..
-rw-r--r--    1 root     root          5552 May  6 17:43 README.md
-rw-r--r--    1 root     root           846 May  6 17:43 app.js
drwxr-xr-x    2 root     root          4096 May  6 17:43 bin
drwxr-xr-x    2 root     root          4096 May  6 17:43 config
drwxr-xr-x    5 root     root          4096 May  6 17:43 db
drwxr-xr-x  198 root     root          4096 Jun  3 02:55 node_modules
-rw-r--r--    1 root     root         97762 May  6 17:43 package-lock.json
-rw-r--r--    1 root     root          1354 May  6 17:43 package.json
drwxr-xr-x    1 root     root          4096 Jun  3 02:55 public
drwxr-xr-x    3 root     root          4096 May  6 17:43 routes
-rwxr-xr-x    1 root     root          1373 Jun  3 03:45 wait-for
```

(If you get stuck, there are sample commands for building the Docker image and
testing the container in the Dockerfile found in the solution.)

### Dockerfile Part 2 - Frontend

You also need to copy in the frontend you built earlier. You will practice
building React apps within docker containers in another activity. For now,
understand that if you change any frontend code you have to remember to 
rebuild _BOTH_ the frontend & the docker image.

You will need to place the React app build files into the folder where the 
Express router serves up static files. Try to write the `COPY` command on your
own.

If you need help or would like to verify your work, here is the line to add
to your _Dockerfile_.

```plaintext
COPY ./frontend/build/ ./public
```

Now, you can run the build and connect to the container again to double check 
the React build files are indeed in the _public_ folder as expected.

## Phase 2: Docker-compose file

To complete the setup, you'll create a `docker-compose.yml` file in the 
root of your project. Copy and paste the following code, then replace the
**image** value to match what you've done so far.

```yml
version: '3.8'
services:
  web:
    build: .
    image: pokedex
    ports:
      - '80:8080'
    environment:
      DATABASE_URL: postgres://pokeuser:pokepass@db:5432/pokedex
    networks:
      pgnodeapp:
    depends_on:
      - "db"
    command: ["./wait-for", "postgres:5432", "-t", "60", "--", "npm", "run", "db:migrate-seed"]

  db:
    image: postgres:12-alpine
    environment:
      POSTGRES_USER: pokeuser
      POSTGRES_PASSWORD: pokepass
      POSTGRES_DB: pokedex
    volumes:
      - postgres-db:/var/lib/postgresql/data
    networks:
      pgnodeapp:
        aliases:
          - 'postgres'

networks:
  pgnodeapp:
    driver: bridge

volumes:
  postgres-db:
```

Notice the database configuration is in the _docker-compose_ instead of an
_.env_ file or in a Dockerfile. This allows it to be adjusted for different
servers. This is useful when using hosting services like the **Heroku Container
Registry**.

You may also notice the `command` which includes **wait-for**. This will be
explained in detail in other activities. For now, it's enough to know the
purpose of **wait-for** is to make sure the database is ready before the
backend app tries to connect to it.

### Verifying locally

> Hint: You can run `docker-compose up` without the `-d` option to see 
> error messages if either container has trouble starting.

Now you can test locally by launching through `docker-compose up -d` 
(this may take a minute or two to complete) and viewing the application running
on `http://localhost/`. If you see a blank page rendered in your browser, view
the application in a new private browser to avoid referencing any authentication
tokens that may have persisted to local storage. Alternatively, you could open
the developer tools and clear local storage.

Reminders (that may help with debugging)

* `docker image ls` will list all images (including the one for the database)
* `docker ps -a` will list all containers
  * If one is showing status with **Exited...** which you didn't stop yourself
(see below), then it may not be starting correctly.
* `docker stop <container-name>` will stop a container, so it can be cleaned up
* `docker container prune` will remove all stopped containers
* `docker system prune -a` will clean up unused images and containers
(including intermediate, cached builds)

> **Important reminder:** If you make _any_ changes to any of the Dockerfiles,
> the `docker-compose.yml` file, or any of the source code files that are copied
> into an image when it's built (using a Dockerfile `COPY` command), you _must_
> rebuild your images by running the command `docker-compose build` or by
> including the `--build` flag when running the `docker-compose up` command
> (i.e. `docker-compose up -d --build` or `docker-compose up --build`).
> **Failing to do this will prevent your changes from having any affect on your
> Docker Compose services as the service containers will be created from
> outdated Docker images.**

## Phase 3: Pushing to Heroku

Once everything is working locally you know it's time to push to the [Heroku
Container Registry][register]!

1. First thing you'll need to do is log in to the Container Registry:
   `heroku container:login`
2. Then create a new application: `heroku create`
3. Build and push up the images to the registry
   * You can push up all our Dockerfile and images by running:
     `heroku container:push web -a {NAME_OF_HEROKU_APP}`
     * When we use the name `web` above, you are telling Heroku to use this
       image as the web process (the default process)
     * The "name" of your Heroku app is the subdomain in your application's URL.
       Given the URL `https://thawing-oasis-19800.herokuapp.com/` the app name
       is `thawing-oasis-19800` (everything between `https://` and the first dot
       `.`)
4. Release your now built images to Containers on Heroku:
   `heroku container:release web -a {NAME_OF_HEROKU_APP}`
   * Again, use the name `web` above to tell Heroku to release
     this image as the web process (the default process)
5. Now you need to set a database `Addon` for your application
   * Run the command `heroku addons` to check that you don't already have the
     Postgres addon provisioned for your application
   * Run the command `heroku addons:create heroku-postgresql:hobby-dev` to
     provision the Postgres addon using the `hobby-dev` plan (the free plan)
   * Run the command `heroku addons` again to check that the Postgres addon was
     provisioned for your application
6. Finally, you have to migrate and seed your application:
   * Migrations: `heroku run npm run db:migrate -a {NAME_OF_APP}`
   * Seeding: `heroku run npm run db:seed:all -a {NAME_OF_APP}`

If you run into any troubles while you are following this guide, make sure to
check the `heroku logs` for your application.

## That is it!

You can now use `heroku open` to be able to see the Pokedex application in all
its glory! 

[register]: https://devcenter.heroku.com/articles/container-registry-and-runtime
[docker env replacement]: https://docs.docker.com/engine/reference/builder/#environment-replacement