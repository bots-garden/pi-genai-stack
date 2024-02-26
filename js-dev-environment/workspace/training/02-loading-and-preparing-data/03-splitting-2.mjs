import { CharacterTextSplitter } from "langchain/text_splitter"

const splitter = new CharacterTextSplitter({
  chunkSize: 32,
  chunkOverlap: 0,
  separator: " "
})

const code = `function helloWorld() {
    console.log("Hello, World!");
    }
    // Call the function
    helloWorld();`
    
let result = await splitter.splitText(code)

console.log(result)
