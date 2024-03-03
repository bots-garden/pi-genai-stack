import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'

//import { Ollama } from "@langchain/community/llms/ollama";

import { 
  SystemMessagePromptTemplate, 
  HumanMessagePromptTemplate, 
  ChatPromptTemplate 
} from "@langchain/core/prompts"

import { ChatOllama } from "@langchain/community/chat_models/ollama"

import { StringOutputParser } from "@langchain/core/output_parsers"


let ollama_base_url = process.env.OLLAMA_BASE_URL

const model = new ChatOllama({
  baseUrl: ollama_base_url, 
  //model: "tinyllama",
  //model: "deepseek-coder",
  model: "gemma:2b", 
  verbose: true
})


const fastify = Fastify({
  logger: false
})

// Serve public/index.html
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'public'),
})

const { ADDRESS = '0.0.0.0', PORT = '8080' } = process.env;

fastify.post('/prompt', async (request, reply) => {
  const something = request.body["something"]
  const language = request.body["language"]

  const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are an expert in computer programming."
    ),
    HumanMessagePromptTemplate.fromTemplate(
        `I want {something} in {language}`
    )
  ])  

  const outputParser = new StringOutputParser()

  const chain = prompt.pipe(model).pipe(outputParser)

  let stream = await chain.stream({
    something: something,
    language: language
  })

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
