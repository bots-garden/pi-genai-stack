import {Ollama} from 'ollama'
// https://github.com/ollama/ollama-js?tab=readme-ov-file#streaming-responses

let ollama_base_url = process.env.OLLAMA_BASE_URL

let ollama = new Ollama({
  host: ollama_base_url
})

const response = await ollama.chat({

  model: 'tinydolphin',
  //model: 'orca-mini:7b',
  messages: [{ 
    role: 'user', 
    content: 'I need a golang function to reverse a string' 
  }],
  stream: true
})

for await (const part of response) {
  process.stdout.write(part.message.content)
}
