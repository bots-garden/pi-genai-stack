import Fastify from 'fastify'
import path from 'path'
import fastifyStatic from '@fastify/static'

import { Ollama } from "@langchain/community/llms/ollama";

let ollama_base_url = process.env.OLLAMA_BASE_URL

const ollama = new Ollama({
  baseUrl: ollama_base_url,
  model: "gemma:2b", 
})

const fastify = Fastify({
  logger: false
})

// Serve public/index.html
fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, 'public'),
})

const { ADDRESS = '0.0.0.0', PORT = '8080' } = process.env;

fastify.get('/prompt', async (request, reply) => {

  const prompt  = request.query.prompt
  const stream = await ollama.stream(prompt)
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
