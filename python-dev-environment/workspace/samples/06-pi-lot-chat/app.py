# TODO:
# When it will work -> make a GenAI app
# Create a domain name

import os

from langchain_community.chat_models import ChatOllama

from langchain.memory import ConversationBufferMemory

from langchain_community.callbacks import StreamlitCallbackHandler
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain


import streamlit as st

ollama_base_url = os.getenv("OLLAMA_BASE_URL")


st.title("🤖 IKnowIt powered by 🦜🔗 LangChain, 🦙 Ollama and 👑 StreamLit")

llm = ChatOllama(
    base_url=ollama_base_url, 
    model='deepseek-coder:instruct',
    temperature=0,
    repeat_penalty=1,
)

st.header("🤓 Chatterbox")

user_input = st.chat_input("👋 Type your question here:")

memory = ConversationBufferMemory()

## session state variable
if 'chat_history' not in st.session_state:
    st.session_state.chat_history=[]
else:
    for message in st.session_state.chat_history:
        memory.save_context({'input': message['human']}, {'output': message['AI']})


prompt_template = PromptTemplate(
    input_variables=['history', 'input'],
    template="""
    You are a technical writer, specialist with programming languages, 
    you will write an answer to the question for the noobs,
    with some source code examples.
    Conversation history:
    {history}

    ### Instruction:
    Human: {input}
    ### Response:
    AI:
    """
) 

conversation_chain = LLMChain(
    prompt=prompt_template,
    llm=llm,
    memory=memory,
    verbose=True, # then you can see the intermediate messages
)


side_bar = st.sidebar

with side_bar:
    container = st.markdown("...")
    
    st_callback = StreamlitCallbackHandler(container)

    if user_input:

        st_callback = StreamlitCallbackHandler(st.container())

        response = conversation_chain(user_input, callbacks=[st_callback])
        
        message = {'human': user_input, 'AI': response['text']}
        st.session_state.chat_history.append(message)
        

with st.container():

    # Display chat history
    messages = st.session_state.chat_history
    for message in messages:
        with st.chat_message('human'):
            st.markdown(message['human'])
        with st.chat_message('AI'):
            st.markdown(message['AI'])



