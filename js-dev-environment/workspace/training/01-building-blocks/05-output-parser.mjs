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
  model: "tinyllama",
  verbose: true
})


const prompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are a TV series expert."
    ),
    HumanMessagePromptTemplate.fromTemplate(
        `Who are the main characters in the {seriesName} series?`
    )
])

const outputParser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(outputParser)

let result = await chain.invoke({
    seriesName: "Star Trek"
})


console.log("📝", result)


