import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"

const loader = new PDFLoader("./TheSimpleGameSystem-R2.pdf");

const rawDocs = await loader.load()

//console.log(rawDocs.slice(0, 5))

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 64,
})

const splitDocs = await splitter.splitDocuments(rawDocs)

console.log(splitDocs.slice(0, 5))

