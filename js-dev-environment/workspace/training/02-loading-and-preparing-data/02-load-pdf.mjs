import { PDFLoader } from "langchain/document_loaders/fs/pdf"

const loader = new PDFLoader("./TheSimpleGameSystem-R2.pdf");

const rawDocs = await loader.load()

console.log(rawDocs.slice(0, 5))