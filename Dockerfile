FROM regt.XXX.YYY.com:5000/nodejs-db2:rhel8-14.17 AS builder
ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}
ENV NODE_CONFIG_STRICT_MODE 1
ENV CI_JOB_ID=${CI_JOB_ID}
ENV APP_NAME foo-bar
ENV APP_DIR /home/appuser/${APP_NAME}

# Working directory
WORKDIR ${APP_DIR}

# Project installation
USER 1000:1000
RUN npm ci || npm install --production
RUN npm prune --production

# Container level
USER root:root
RUN yum remove -y gcc-c++ glibc-devel libc-headers kernel-headers \
    && yum clean all

# Switch to appuser (pid: 1000)
USER 1000:1000
COPY ./ ./
