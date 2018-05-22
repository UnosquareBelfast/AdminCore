default: build_admin_core build_cors_proxy

version?=0.0.1

build_admin_core: tag_latest_admin_core
build_cors_proxy: tag_latest_cors_proxy

# Docker build images
admin_core:
	@echo 'build admincore image'
	docker build --rm -f docker/admin.core.Dockerfile -t unosquare/admincore:$(version) .

cors_proxy:
	@echo 'build cors proxy image'
	docker build --rm -f docker/express.cors.proxy.Dockerfile -t unosquare/cors-proxy:$(version) .

# Docker tagging
tag_latest_admin_core: admin_core
	@echo 'create tag latest fot admincore'
	docker tag unosquare/admincore:$(version) unosquare/admincore:latest

tag_latest_cors_proxy: cors_proxy
	@echo 'create tag latest for cors proxy'
	docker tag unosquare/cors-proxy:$(version) unosquare/cors-proxy:latest