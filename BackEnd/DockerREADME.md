//run this to build
docker build -f Dockerfile -t admincore .

//run this to run change port number where applicable
docker run -p 8081:8081 admincore


//add this to the pg_hba.conf located in the C:\Program Files\PostgreSQL\10\data
host    all             all             10.10.114.82    255.255.255.128     trust


##### Use the Makefile to create the docker containers
```sh
$ (make | nmake) build_admin_core # to build the admin core
$ (make | nmake) build_cors_proxy # to build the cors proxy server
```

##### Use docker compose to serve the created container
```sh
$ docker-compose up
```