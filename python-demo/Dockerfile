FROM langchain/langchain

WORKDIR /app
RUN <<EOF
apt-get update
apt-get install -y build-essential curl software-properties-common
rm -rf /var/lib/apt/lists/*
EOF

COPY requirements.txt .
COPY index.html .

RUN pip install --upgrade -r requirements.txt

ENTRYPOINT [ "python3", "-m", "http.server", "8000" ]
 