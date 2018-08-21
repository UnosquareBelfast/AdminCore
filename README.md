# AdminCore

AdminCore is currently an internal solution for Unosquare to manage employee holidays.

There are currently 3 parts to the AdminCore project:
1. Web-App - Is the front-end for the AdminCore web-app.
2. NativeApp - Is the front-end for the AdminCore android and iOS apps.
3. BackEnd - The back-end to the project. Web-App and NativeApp run off this.

## Getting up and running
Before following the steps be sure to clone this repositry to the local machine.

### BackEnd
**Note: If you're on a Windows machine that doesn't have the pro version of the operating system, follow the non-pro instructions.**

1. Download & Install [Docker](https://www.docker.com/products/docker-desktop).
2. Download & Install [PostgreSQL](https://www.postgresql.org/download/)
3. Build the Docker images:
    1. Navigate to `/BackEnd/` in your terminal.
    2. Run `docker build -f docker/admin.core.Dockerfile -t unosquare/admincore:latest .`
    3. Run `docker build -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:latest .`
4. Finally, run the project with `docker-compose up`

#### Non-Pro Windows:

1. Download & Install [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).
2. Follow the docs in the above guide until you get the docker command console open. Enter all docker commmands here.
3. Follow the standard instructions from point 2.


### Web-App
**Note: Follow the back-end instructions first.**

1. Download & Install [Node V8.11.1](https://nodejs.org/en/download/releases/) for NPM.
2. Navigate to `/web-app/`.
3. Run `npm install` to get the dependencies for the project.
4. Create a file `.env` inside `/web-app/` with the following line: `DOMAIN='http://localhost:8081'`. This points to the back-end. If you are using Docker Toolbox the domain may differ.
5. Run `npm start` to start the web-server.

### Native App
Awaiting Documentation

## How to update the back end
Currently it's a bit of handling to update the backend. Here's how to it. Run the following commands in `/BackEnd/`. I've found that I need to use powershell for some of the following commands.

1. De-compose the BackEnd `docker-compose down`.
2. Delete all containers `docker rm -f $(docker ps -a -q)`
3. Delete all volumes `docker volume rm $(docker volume ls -q)`
4. Remove images: `docker rmi unosquare/admincore unosquare/cors-proxy`
5. Follow BackEnd setup guide above from point 3.

## Back end troubleshooting
- If you're experiencing problems after running `docker-compose up` it may be due to PostgresQL running locally. Use task manager or the mac equivilent to shut down all the PostgresQL processes.

