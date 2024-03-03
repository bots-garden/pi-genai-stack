import {Ollama} from 'ollama'

let ollama_base_url = process.env.OLLAMA_BASE_URL

let ollama = new Ollama({
  host: ollama_base_url
})

const response = await ollama.chat({
  model: 'deepseek-coder',
  messages: [{ 
    role: 'user', 
    content: 'write me a simple rustlang tutorial that prints "hello world"' 
  }],
  stream: true
})

for await (const part of response) {
  process.stdout.write(part.message.content)
}
