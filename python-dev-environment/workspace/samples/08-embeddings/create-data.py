import os
from langchain_community.llms import ollama

from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
# RAG

ollama_base_url = os.getenv("OLLAMA_BASE_URL")
current_model='gemma:2b'

# use the document
#-----------------------
# RAG
#-----------------------
print("🤖 Open the document...")
with open("./information.md") as f:
    documents = f.read()

print("🤖 Split documents into chunks...")
# Split documents into chunks
text_splitter = CharacterTextSplitter(chunk_size=1500, chunk_overlap=30)
splits = text_splitter.split_text(documents)
print("🤖 Splitting ended")

print("🤖 Select embeddings...")
# Select embeddings
embeddings = OllamaEmbeddings(
    base_url=ollama_base_url, 
    model=current_model
)

print("🤖 Create a vectorstore from documents...")
# Create a vectorstore from documents
persist_directory = './chroma_storage'

vectordb = Chroma.from_texts(
    texts=splits,
    embedding=embeddings,
    persist_directory=persist_directory,
    metadatas=[{"source": i} for i in range(len(splits))]
)

vectordb.persist()
print("🤖 Done with document...")

vectordb_loaded = Chroma(
    persist_directory=persist_directory,
    embedding_function=embeddings
)
print(vectordb_loaded._collection.count())



