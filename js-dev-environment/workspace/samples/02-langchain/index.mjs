
import { Ollama } from "@langchain/community/llms/ollama";

let ollama_base_url = process.env.OLLAMA_BASE_URL

const ollama = new Ollama({
  baseUrl: ollama_base_url, // Default value
  model: "tinyllama", // Default value
})

const stream = await ollama.stream(
  `Translate "I love programming" into German.`
)

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk)
}

console.log(chunks.join(""))
