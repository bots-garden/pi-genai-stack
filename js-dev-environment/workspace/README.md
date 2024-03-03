# JavaScript Dev Environment

```bash
find . -name '.DS_Store' -type f -delete
```

curl http://ollama-service:11434/api/generate -d '{
  "model": "tinydolphin",
  "prompt": "Explain simply what is GoLang",
  "stream": true
}'

curl http://ollama-service:11434/api/generate -d '{
  "model": "tinydolphin",
  "prompt": "Explain simply what is RustLang",
  "stream": true
}'