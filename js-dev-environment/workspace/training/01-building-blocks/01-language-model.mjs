
import { ChatOllama } from "@langchain/community/chat_models/ollama"
import { HumanMessage } from "@langchain/core/messages"

/*
Language model:

Text LLMs: string -> string
Chat models: list of messages -> single message output
*/

let ollama_base_url = process.env.OLLAMA_BASE_URL

const model = new ChatOllama({
  baseUrl: ollama_base_url, 
  model: "tinyllama",
  verbose: true
})


await model.invoke([
    new HumanMessage("Who is James T Kirk?")
])
