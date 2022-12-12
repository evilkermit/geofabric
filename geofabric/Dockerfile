# Creates an Quesadillas container for the Quesadillas project.
# This Dockerfile was originally written by Tanner Hobson (thobson2@vols.utk.edu)

FROM ubuntu:jammy
MAINTAINER Hunter Price <hprice7@vols.utk.edu>

ARG build_parallel
ARG minifyjs

RUN apt-get update && \
    apt-get install -y \
            # Needed By: everything
            build-essential \
            # Needed By: everything
            cmake \
            # Needed By: pistache for running tests
            python3 \
            # Needed By: rasty
            gdal-bin libgdal-dev libcgal-dev \
            # Needed By: embree and ospray for their threading framework
            libtbb-dev \
            # Needed By: ospray for glm
            xorg-dev libglu1-mesa-dev \
            # Needed By: embree and ospray for OpenGL
            libglu1-mesa-dev freeglut3-dev mesa-common-dev \
            # Needed By: enchiladas for pthreads
            libc6-dev \
            # Needed By: pbnj for netcdf support
            libnetcdf-c++4-1 libnetcdf-dev libnetcdf-c++4-dev \
            # Needed By: enchiladas for minifying JavaScript
            python3-pip \
            # Needed By: tapestry studio for exporting to mp4
            # ffmpeg \
            git \
            yasm \
    && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/
COPY rapidjson /opt/rapidjson
WORKDIR /opt/rapidjson/build/
RUN true && \
    cmake .. \
          -DRAPIDJSON_BUILD_EXAMPLES:BOOL=OFF \
          -DRAPIDJSON_BUILD_TESTS:BOOL=OFF \
    && \
    make ${build_parallel} && \
    make install && \
    rm -rf /opt/rapidjson

WORKDIR /opt/
ADD oneapi-tbb-2021.5.0-lin.tgz /opt/
RUN mv oneapi-tbb-2021.5.0 tbb
WORKDIR /opt/tbb/

# ispc here?

WORKDIR /opt/
ADD embree-3.13.3.x86_64.linux.tar.gz /opt/
RUN mv embree-3.13.3.x86_64.linux embree
WORKDIR /opt/embree/

# setup ospray
WORKDIR /opt/
ADD ospray-2.10.0.x86_64.linux.tar.gz /opt/
RUN mv ospray-2.10.0.x86_64.linux ospray

WORKDIR /opt/
COPY rkcommon /opt/rkcommon
WORKDIR /opt/rkcommon/build
RUN true && \
    cmake .. \
        -DTBB_ROOT=/opt/tbb/ \
    && \
    cmake --build .  && \
    make install
        #   --config Release \
        #   --target install \
        #   -- ${build_parallel} && \

# SVT-HEVC here?
# ffmpeg here?

WORKDIR /opt/
COPY quesadillas /opt/quesadillas
# COPY rasty /opt/quesadillas/resources/rasty
# COPY pistache /opt/quesadillas/resources/pistache
WORKDIR /opt/quesadillas/build
RUN true && \
    pip install rjsmin && \
    cmake .. \
          -DCMAKE_CXX_COMPILER=g++ \
          -DCMAKE_C_COMPILER=gcc \
          -DUSE_NETCDF:BOOL=ON \
          -DBUILD_EXAMPLES:BOOL=OFF \
          -DOSPRAY_INSTALL_DIR=/opt/ospray/ \
           -DTBB_ROOT=/opt/tbb/ \
          -Dembree_DIR=/opt/embree \
          -DENABLE_MINIFY=${minifyjs:+ON}${minifyjs:-OFF} \
    && \
    make ${build_parallel} && \
    make install


# Copy dependency installation script 
COPY install_dependencies.sh /opt/install_dependencies.sh
RUN /opt/install_dependencies.sh

# start server
# if you need an app directory, start the server with an environment variable APP_DIR
CMD ["sh", "-c", "./server /config 9010 ${APP_DIR}"]




