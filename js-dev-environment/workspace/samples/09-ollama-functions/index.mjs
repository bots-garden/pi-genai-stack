import { OllamaFunctions } from "langchain/experimental/chat_models/ollama_functions";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

let ollama_base_url = process.env.OLLAMA_BASE_URL

// function descriptions/specifications
const hello = {
  name: "hello",
  description: `
  When you want to say hello to a given person, 
  generate a greeting message with the name of this person
  `,
  parameters: {
    type: "object", 
    properties: { 
      name: {
        type: "string",
        description: "name of the person"
      }
    }
  }
}

const addNumbers = {
  name: "addNumbers",
  description:`
  When you want to add the given figures or numbers,
  create a list with this figures and or numbers
  `,
  parameters: {
    type: "object", 
    properties: { 
      numbers: {
        type: "array",
        description: "the list of the numbers and figures"
      }
    }
  }
}

const model = new OllamaFunctions({
    baseUrl: ollama_base_url,
    temperature: 0.1,
    model: "tinydolphin",
}).bind({
  functions: [
    hello, addNumbers
  ],
})


const whichFunction =  async (text) => {
  const response = await model.invoke([
    new HumanMessage({
      content: text
    }),
  ])

  const functionName = response.additional_kwargs.function_call.name
  const params = JSON.parse(response.additional_kwargs.function_call.arguments)

  console.log(response)

  switch (functionName) {
    case "hello":
      console.log("👋 hello", params["name"])
      break
  
    case "addNumbers":
      console.log("🤖 the numbers are", params)
      break

    default:
      console.log("🤖 I don't know what to do")
      break
  }
}

await whichFunction("Hey, say hello to Philippe")
await whichFunction("please, add 45 and 56")
await whichFunction("This is a nice day, hello sam")
await whichFunction("please, add 3 and 4")

await whichFunction("please, add 42, 67 and 32")
