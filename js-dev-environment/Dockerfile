FROM node:20

ARG CODER_VERSION=${CODER_VERSION}
ARG CODER_ARCH=${CODER_ARCH}

# ------------------------------------
# Install Coder
# ------------------------------------
RUN <<EOF
curl -fOL https://github.com/coder/code-server/releases/download/v$CODER_VERSION/code-server_${CODER_VERSION}_${CODER_ARCH}.deb
dpkg -i code-server_${CODER_VERSION}_${CODER_ARCH}.deb
EOF

RUN <<EOF
apt-get update
apt-get install -y build-essential curl software-properties-common
rm -rf /var/lib/apt/lists/*
EOF

WORKDIR /js-dev-environment

CMD ["/bin/bash"]
