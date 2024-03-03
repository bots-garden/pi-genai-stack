import { Ollama } from "@langchain/community/llms/ollama";

let ollama_base_url = process.env.OLLAMA_BASE_URL

const ollama = new Ollama({
  baseUrl: ollama_base_url,
  model: "deepseek-coder", 
})

const stream = await ollama.stream("what is golang?")

for await (const chunk of stream) {
  process.stdout.write(chunk)
}
