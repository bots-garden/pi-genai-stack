import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 32,
    chunkOverlap: 0,
})

const code = `function helloWorld() {
    console.log("Hello, World!");
    }
    // Call the function
    helloWorld();`
    
let result = await splitter.splitText(code)

console.log(result)

const splitter2 = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 64,
    chunkOverlap: 32,
})
  
let result2 = await splitter2.splitText(code)
console.log(result2)