### Building Images
**With Docker**
```
# to build the admin core
docker build -f docker/admin.core.Dockerfile -t unosquare/admincore:<version> .
docker tag unosquare/admincore:<version> unosquare/admincore:latest

# to build the cors proxy
docker build -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:<version> .
docker tag unosquare/cors-proxy:<version> unosquare/cors-proxy:latest
```

**With Make**
```
# to build the admin core
(make | nmake) build_admin_core [version=x.x.x] # to build the admin core, version (default 0.0.1) can be passed in

# to build the cors proxy
(make | nmake) build_cors_proxy [version=x.x.x] # to build the cors proxy server, version (default 0.0.1) can be passed in

# to build both docker images
(make | nmake) [version=x.x.x] # to build both admin core and cors proxy server, version (default 0.0.1) can be passed in
```

### Serving Containers
Finally, run the following to serve the two containers created above
```
docker-compose up
```