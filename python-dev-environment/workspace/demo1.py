import os

from langchain_community.llms import ollama

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

llm = ollama.Ollama(
    base_url=ollama_base_url, 
    model='tinydolphin',
)

prompt = "Who is Bram Stoker?"

completion = llm.invoke(prompt)

print(completion)


