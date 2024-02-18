import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";

let ollama_base_url = process.env.OLLAMA_BASE_URL

const model = new ChatOllama({
  baseUrl: ollama_base_url, 
  model: "tinyllama",
})

const stream = await model
  .pipe(new StringOutputParser())
  .stream(`Translate "I love programming" into German.`)

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk)
}

console.log(chunks.join(""))