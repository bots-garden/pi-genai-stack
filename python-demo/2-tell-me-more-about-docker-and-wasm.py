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

llm.invoke("Can you tell me more about Docker+Wasm Technical Preview 2?")

print('\n')

