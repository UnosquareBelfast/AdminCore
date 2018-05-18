### Building Images
**With Docker**
```
# to build the admin core
docker build -f docker/admin.core.Dockerfile -t unosquare/admincore:0.0.1 .
docker tag docker/admin.core:0.0.1 docker/admin.core:latest

# to build the cors proxy
docker build -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:0.0.1 .
docker tag unosquare/cors-proxy:0.0.1 unosquare/cors-proxy:latest
```

**With Make**
```
# to build the admin core
(make | nmake) build_admin_core

# to build the cors proxy
(make | nmake) build_cors_proxy

# to build both docker images
(make | nmake)
```

### Database Config
Add the following to the `pg_hba.conf` file associated with your PostgreSQL DB

`host    all             all             10.10.114.82    255.255.255.128     trust`

### Serving Containers
Finally, run the following to serve the two containers created above
```
docker-compose up
```
