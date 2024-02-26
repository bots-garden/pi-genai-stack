import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { StringOutputParser } from "@langchain/core/output_parsers";

let ollama_base_url = process.env.OLLAMA_BASE_URL

const chatModel = new ChatOllama({
    baseUrl: ollama_base_url, 
    model: "tinyllama",
})
  
const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a programming technical documentation writer."],
    ["user", "{input}"],
])

const outputParser = new StringOutputParser()

const llmChain = prompt.pipe(chatModel).pipe(outputParser)

let stream = await llmChain.invoke({
  input: "what is GoLang?",
})

const chunks = []
for await (const chunk of stream) {
  chunks.push(chunk)
}

console.log(chunks.join(""))
