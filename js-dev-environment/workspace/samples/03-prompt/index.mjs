//import { Ollama } from "@langchain/community/llms/ollama";

import { ChatOllama } from "@langchain/community/chat_models/ollama"
import { StringOutputParser } from "@langchain/core/output_parsers"

import { 
  SystemMessagePromptTemplate, 
  HumanMessagePromptTemplate, 
  ChatPromptTemplate 
} from "@langchain/core/prompts"

let ollama_base_url = process.env.OLLAMA_BASE_URL

const model = new ChatOllama({
  baseUrl: ollama_base_url,
  model: "deepseek-coder", 
  temperature: 0,
  repeatPenalty: 1,
  verbose: false
})

const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are an expert in computer programming.
     Please make friendly answer for the noobs.
     Add source code examples if you can.
    `
  ),
  HumanMessagePromptTemplate.fromTemplate(
    `I need a clear explanation regarding my {question}.
     And, please, be structured with bullet points.
    `
  )
])  

const outputParser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(outputParser)

let stream = await chain.stream({
  question: "whar are structs in Golang?",
})

for await (const chunk of stream) {
  process.stdout.write(chunk)
}
