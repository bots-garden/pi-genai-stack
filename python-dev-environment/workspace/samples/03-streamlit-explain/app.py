import os
from langchain_community.llms import ollama
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain.prompts import PromptTemplate

import streamlit as st

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

model = ollama.Ollama(
    base_url=ollama_base_url, 
    model='tinyllama',
)

# Add a title and a subtitle to the webapp
st.title("🤓 Tell me more about this language")
st.header("👋 I'm running on a PI5")

# Text input fields
language = st.text_input("Language:")
what = st.text_input("Topic:")

# Prompt template
prompt = PromptTemplate.from_template(
    "Explain the programming concept of {what} in {language}."
)

# Executing the chain when the user 
# has entered a language and a topic  
if language and what:
    st_callback = StreamlitCallbackHandler(st.container())
    
    # Chain using model and formatting          
    chain = prompt | model        
    # Invoking the chain      
    response = chain.invoke({"what": what, "language": language}, {"callbacks": [st_callback]})     
