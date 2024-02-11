import os

from langchain_community.llms import ollama
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

llm = ollama.Ollama(
    base_url=ollama_base_url, 
    model='tinydolphin', 
    callback_manager= CallbackManager([StreamingStdOutCallbackHandler()])
)

llm.invoke("could you create a Dockerfile for a node.js application?")
#llm.invoke("how to build a wasm binary with tinygo? What is the command?")


print('\n')

