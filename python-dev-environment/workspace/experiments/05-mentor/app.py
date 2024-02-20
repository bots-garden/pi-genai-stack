import os

from langchain_community.chat_models import ChatOllama
from langchain.schema import (SystemMessage, HumanMessage, AIMessage)
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain.prompts import PromptTemplate

import streamlit as st

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

llm = ChatOllama(
    base_url=ollama_base_url, 
    model='tinyllama',
    temperature=0,
)

st.set_page_config(
    page_title="Chatterbox",
    page_icon="🤓",
)

language = "Golang"

st.header("🤓 {} Chatterbox".format(language))

user_input = st.chat_input("👋 Type your question here:")


# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = [
        SystemMessage(content="🤖 hello, I will be your mentor")
    ]

side_bar = st.sidebar

with side_bar:
    container = st.markdown("...")
    
    st_callback = StreamlitCallbackHandler(container)

    if user_input:

        st.session_state.messages.append(HumanMessage(content=user_input))

        explanation_prompt = PromptTemplate.from_template(
            """
            You are a technical writer, specialist with the {language} programming language, 
            you will write an answer to the question for the noobs,
            with some source code examples.
            All the answers have to be short and simple.
            Question: {user_input}
            """
        )

        # Chain using model and formatting          
        chain = explanation_prompt | llm
        response = chain.invoke({"language": language, "user_input": user_input}, {"callbacks": [st_callback]})     

        st.session_state.messages.append(AIMessage(content=response.content))
        

with st.container():

    # Display chat history
    messages = st.session_state.get('messages', [])
    for message in messages:
        if isinstance(message, AIMessage):
            with st.chat_message('assistant'):
                st.markdown(message.content)
        elif isinstance(message, HumanMessage):
            with st.chat_message('user'):
                st.markdown(message.content)
        else:  # isinstance(message, SystemMessage):
            st.write(f"System message: {message.content}")
