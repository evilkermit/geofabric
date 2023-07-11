#!/bin/bash
docker run -it \
    -v /home/jduggan1/geofabric/app:/app \
    -v /home/jduggan1/geofabric/config:/config \
    -v /mnt/seenas2/data/NPS_converted/geofabric:/data \
    -p 9010:9010 \
    --env APP_DIR=/app \
    --name geofabric \
    geofabric
