# pi-genai-stack

The main objective is to run 🦙 @ollama and 🐬 TinyDolphin on a Raspberry Pi 5 with @docker #Compose.

## How to install the stack on the Pi

```bash
git clone git@github.com:bots-garden/pi-genai-stack.git
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

## How to update Ollam

```bash
cd pi-genai-stack
docker compose down
docker compose up --build
```

## Test your stack remotely

### First test with a simple curl request
> - The answer time is long because we do not use streaming
> - Where `hal.local` is the DNS name of my Pi

```bash
curl http://hal.local:11434/api/generate -d '{
  "model": "tinydolphin",
  "prompt": "Explain simply what is WebAssembly",
  "stream": false
}'
```

### Get the list of the models

```bash
curl http://hal.local:11434/api/tags
```

### Load another model

```bash
curl http://hal.local:11434/api/pull -d '{
  "name": "phi"
}'
```

> ✋ **llama2** is too big for a Pi

### Delete a model

```bash
curl -X DELETE http://hal.local:11434/api/delete -d '{
  "name": "llama2"
}'
```

## Blog posts

- Host Ollama and TinyDolphin LLM on a Pi5 with Docker Compose: [Run Ollama on a Pi5](https://k33g.hashnode.dev/run-ollama-on-a-pi5)