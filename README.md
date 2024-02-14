# pi-genai-stack

The main objective is to run 🦙 @ollama and 🐬 TinyDolphin on a Raspberry Pi 5 with @docker #Compose.

## How to install the stack on the Pi

```bash
git clone git@github.com:bots-garden/pi-genai-stack.git
# or git clone https://github.com/bots-garden/pi-genai-stack.git
cd pi-genai-stack
docker compose up
```

> 👋 one of the services (from the compose file) will tell Ollama to download the `tinydolphin` LLM, then all the samples of the demos will use this model.

## Run the samples of the python-demo

Use the `python` with the interactive mode:
```bash
docker exec --workdir /python-demo -it python-demo /bin/bash
```

Run the python files:
```bash
python3 1-give-me-a-dockerfile.py
# or
python3 2-tell-me-more-about-docker-and-wasm.py
```

## How to update the Ollama image

```bash
cd pi-genai-stack
docker compose down
docker compose up --build
```

## How to update the project on your Pi

```bash
cd pi-genai-stack
git pull
```

## Blog posts

- Host Ollama and TinyDolphin LLM on a Pi5 with Docker Compose: [Run Ollama on a Pi5](https://k33g.hashnode.dev/run-ollama-on-a-pi5)