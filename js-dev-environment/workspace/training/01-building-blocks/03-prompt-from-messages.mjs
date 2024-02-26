import { 
    SystemMessagePromptTemplate, 
    HumanMessagePromptTemplate, 
    ChatPromptTemplate 
} from "@langchain/core/prompts"
  

const promptFromMessages = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "You are a TV series expert."
    ),
    HumanMessagePromptTemplate.fromTemplate(
        `Who are the main characters in the {seriesName} series?`
    )
])

let humanMessage = await promptFromMessages.formatMessages({
    seriesName: "Star Trek"
})

console.log(humanMessage)

// This way gives the same result

const anotherPromptFromMessages = ChatPromptTemplate.fromMessages([
    ["system", "You are a TV series expert."],
    ["human", `Who are the main characters in the {seriesName} series?`]
])

humanMessage = await promptFromMessages.formatMessages({
    seriesName: "Star Trek"
})

console.log(humanMessage)