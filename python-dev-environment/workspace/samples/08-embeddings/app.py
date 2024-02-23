import os
from langchain_community.llms import ollama
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain.prompts import PromptTemplate

# All we need for a good chat
from langchain.memory import ConversationBufferMemory
#from langchain.chains import LLMChain

# RAG
from langchain.chains.question_answering import load_qa_chain

from langchain.text_splitter import CharacterTextSplitter

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
# RAG

import streamlit as st

ollama_base_url = os.getenv("OLLAMA_BASE_URL")
current_model='tinydolphin'

# use the document
#-----------------------
# RAG
#-----------------------
with open("./information.md") as f:
    documents = f.read()

print("🤖 Split documents into chunks...")
# Split documents into chunks
text_splitter = CharacterTextSplitter(chunk_size=1500, chunk_overlap=30)
texts = text_splitter.split_text(documents)

print("🤖 Select embeddings...")
# Select embeddings
embeddings = OllamaEmbeddings(
    base_url=ollama_base_url, 
    model=current_model
)

print("🤖 Create a vectorstore from documents...")
# Create a vectorstore from documents
docsearch = Chroma.from_texts(
    texts, embeddings, metadatas=[{"source": i} for i in range(len(texts))]
)
print("🤖 Done with documents...")

#-----------------------
# Prompt
#-----------------------

template = """
You are a chatbot having a conversation with a human.
Given the following extracted parts of a long document and a question, create a final answer.

{context}

Human: {human_input}
Chatbot:
"""

#{chat_history}

prompt = PromptTemplate(
    #input_variables=["chat_history", "human_input", "context"], 
    input_variables=["human_input", "context"], 
    template=template
)

#memory = ConversationBufferMemory(memory_key="chat_history", input_key="human_input")

chain = load_qa_chain(
    ollama.Ollama(
        temperature=0, 
        repeat_penalty=1,
        base_url=ollama_base_url, 
        model=current_model
    ), 
    chain_type="stuff", 
    #memory=memory, 
    prompt=prompt
)

# Page title
st.set_page_config(page_title='🦜🔗 Ask the Doc App')
st.title('🦜🔗 Ask the Doc App')

# Query text
user_input = st.chat_input('Enter your question:')

# Form input and query
result = []
if user_input:
    #with st.spinner('Calculating...'):
    st_callback = StreamlitCallbackHandler(st.container())

    docs = docsearch.similarity_search(user_input)
    #response = chain.invoke({"input_documents": docs, "human_input": user_input}, return_only_outputs=True)
    
    response = chain.run(input_documents=docs, human_input=user_input, callbacks=[st_callback])

    # print(chain.memory.buffer)
        

    result.append(response)

if len(result):
    st.info(response)

