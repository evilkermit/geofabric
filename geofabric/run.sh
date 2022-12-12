#!/bin/bash
docker run -it \
    -v /home/hp/github/research/geofabric/examples/smnp-docker/app:/app \
    -v /home/hp/github/research/geofabric/examples/smnp-docker/config:/config \
    -v /home/hp/github/research/geofabric/examples/smnp-docker/data:/data \
    -p 9010:9010 \
    --env APP_DIR=/app \
    hprice7/geo-fabric 