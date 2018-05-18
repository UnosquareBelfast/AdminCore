default: build_admin_core build_cors_proxy


build_admin_core:
   docker build --rm -f docker/admin.core.Dockerfile -t unosquare/admincore:0.0.1 .
   docker tag unosquare/admincore:0.0.1 unosquare/admincore:latest


build_cors_proxy:
   docker build --rm -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:0.0.1 .
   docker tag unosquare/cors-proxy:0.0.1 unosquare/cors-proxy:latest
