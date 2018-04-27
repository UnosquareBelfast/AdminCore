default: build_admin_core

IMAGE_VERSION=0.0.1
IMAGE_NAME=admincore
IMAGE_TAG_NAME=unosquare/$(IMAGE_NAME):$(IMAGE_VERSION)
build_admin_core:
	docker build --rm -f Dockerfile -t $(IMAGE_TAG_NAME) .
	docker tag $(IMAGE_TAG_NAME) unosquare/$(IMAGE_NAME):latest


IMAGE_VERSION=0.0.0
IMAGE_NAME=cors-proxy
IMAGE_TAG_NAME=unosquare/$(IMAGE_NAME):$(IMAGE_VERSION)
build_cors_proxy:
	docker build --rm -f express.cors.proxy.Dockerfile -t $(IMAGE_TAG_NAME) .
	docker tag $(IMAGE_TAG_NAME) unosquare/$(IMAGE_NAME):latest