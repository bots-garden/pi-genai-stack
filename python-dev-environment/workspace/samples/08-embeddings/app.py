import os
from langchain_community.llms import ollama
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain.prompts import PromptTemplate

from langchain.chains.combine_documents import create_stuff_documents_chain

from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings

import streamlit as st

ollama_base_url = os.getenv("OLLAMA_BASE_URL")
current_model='gemma:2b'

# use the document
def find_docs(input):
    print("🤖 Select embeddings...")
    # Select embeddings
    embeddings = OllamaEmbeddings(
        base_url=ollama_base_url, 
        model=current_model
    )
    print("🤖 Open the vectorstore")
    # Create a vectorstore from documents

    persist_directory = './chroma_storage'

    vectordb = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
    print("🤖 Vectorstore loaded")
    return vectordb.similarity_search(input)

# Prompt
template = """
You are a chatbot having a conversation with a human.
Given the following extracted parts of a long document and a question, create a final answer.

{context}

Human: {human_input}
Chatbot:
"""

prompt = PromptTemplate(
    input_variables=["human_input", "context"], 
    template=template
)

model = ollama.Ollama(
    temperature=0, 
    repeat_penalty=1,
    base_url=ollama_base_url, 
    model=current_model
)

chain = create_stuff_documents_chain(
    llm=model,
    prompt=prompt
)

# Page title
st.set_page_config(page_title='🦜🔗 Ask the Doc App')
st.title('🦜🔗 Ask the Doc App')

# Query text
user_input = st.chat_input('Enter your question:')

# Form input and query
if user_input:
    st_callback = StreamlitCallbackHandler(st.container())

    docs = find_docs(user_input)

    response = chain.invoke(
        {"context":docs, "human_input":user_input}, 
        {"callbacks":[st_callback]}
    )

