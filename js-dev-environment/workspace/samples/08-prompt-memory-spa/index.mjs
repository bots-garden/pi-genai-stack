import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'

import { ChatOllama } from "@langchain/community/chat_models/ollama"
import { StringOutputParser } from "@langchain/core/output_parsers"

import { RunnableWithMessageHistory } from "@langchain/core/runnables" // 👋

import { ConversationSummaryMemory } from "langchain/memory" // 🤗


import { 
  SystemMessagePromptTemplate, 
  HumanMessagePromptTemplate, 
  MessagesPlaceholder, // 👋
  ChatPromptTemplate 
} from "@langchain/core/prompts"

let ollama_base_url = process.env.OLLAMA_BASE_URL

const model = new ChatOllama({
  baseUrl: ollama_base_url,
  model: "deepseek-coder", 
  temperature: 0,
  repeatPenalty: 1,
  verbose: true,
})

const memory = new ConversationSummaryMemory({
  memoryKey: "history",
  llm: model,
})

const prompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are an expert in computer programming.
     Please make friendly answer for the noobs.
     Add source code examples if you can.
    `
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate(
    `I need a clear explanation regarding my {question}.
     And, please, be structured with bullet points.
    `
  )
])

//var messageHistory = new ChatMessageHistory()

const fastify = Fastify({
  logger: true
})

// Serve public/index.html
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'public'),
})

const { ADDRESS = '0.0.0.0', PORT = '8080' } = process.env;


fastify.delete('/clear-history', async (request, reply) => {
  console.log("👋 clear conversation summary")
  memory.clear()
  return "👋 conversation summary is empty"
})

fastify.get('/message-history', async (request, reply) => {
  return memory.chatHistory.getMessages()
})

fastify.post('/prompt', async (request, reply) => {
  const question = request.body["question"]

  const outputParser = new StringOutputParser()

  const chain = prompt.pipe(model).pipe(outputParser)
  
  const chainWithHistory = new RunnableWithMessageHistory({ // 👋
    runnable: chain,
    memory: memory,
    getMessageHistory: (_sessionId) => memory.chatHistory,
    inputMessagesKey: "question",
    historyMessagesKey: "history",
  })

  const config = { configurable: { sessionId: "1" } } // 👋

  let stream = await chainWithHistory.stream({
    question: question,
  }, config) // 👋
  

  reply.header('Content-Type', 'application/octet-stream')
  return reply.send(stream)
  
})

const start = async () => {
  try {
    await fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10)  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${ADDRESS}:${PORT}`)

}
start()

