#!/usr/bin/env bash
docker container rm -f 'geofabric'
docker build geofabric -t 'geofabric'
docker container run -p 9010:9010 -v /home/jduggan1/geofabric/app:/app -v /home/jduggan1/geofabric/config:/config -v /mnt/seenas2/data/NPS_converted:/data --env APP_DIR=/app --name 'geofabric' -td 'geofabric'
