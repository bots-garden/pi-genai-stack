import os

from langchain.chains.question_answering import load_qa_chain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain_community.llms import ollama

from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma

from langchain_community.embeddings import OllamaEmbeddings

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

print("\n🤖 Hello 👋 , I'm Hal 🙂\n")

print("📝 reading the document...\n")
with open("./docker-doc.md") as f:
    my_data = f.read()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)

print("🔪 splitting the document...\n")
texts = text_splitter.split_text(my_data)

embeddings = OllamaEmbeddings(base_url=ollama_base_url, model='llama2')

print("📦 embedding the document into the database...\n")
docsearch = Chroma.from_texts(
    texts, embeddings, metadatas=[{"source": i} for i in range(len(texts))]
)

template = """You are a chatbot having a conversation with a human.

Given the following extracted parts of a long document and a question, create a final answer.

{context}

{chat_history}

Human: {human_input}

Chatbot:"""

prompt = PromptTemplate(
    input_variables=["chat_history", "human_input", "context"], template=template
)

memory = ConversationBufferMemory(memory_key="chat_history", input_key="human_input")
chain = load_qa_chain(
    ollama.Ollama(
        temperature=0, 
        base_url=ollama_base_url, 
        model='tinydolphin'
    ), 
    chain_type="stuff", 
    memory=memory, 
    prompt=prompt
)

query = "How to activate the wasm support in docker desktop? And give me all the prerequisites"

print("🤔 " + query + " ⏳ ...\n")

docs = docsearch.similarity_search(query)

print("🤖 please wait for a minute...\n")
chain.invoke({"input_documents": docs, "human_input": query}, return_only_outputs=True)

print("🎉 and this is my answer:\n")
print(chain.memory.buffer)


