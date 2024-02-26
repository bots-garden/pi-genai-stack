// Prompt template
import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromTemplate(
    `Who are the main characters in the {seriesName} series?`
)

let humanInput = await prompt.format({
    seriesName: "Star Trek"
})

console.log(humanInput)

let humanMessage = await prompt.formatMessages({
    seriesName: "Star Trek"
})

console.log(humanMessage)

