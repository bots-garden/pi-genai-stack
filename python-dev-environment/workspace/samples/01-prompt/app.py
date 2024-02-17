import os

from langchain_community.llms import ollama
from langchain.prompts import PromptTemplate

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

model = ollama.Ollama(
    base_url=ollama_base_url, 
    model='tinydolphin',
)

prompt_template = PromptTemplate.from_template(
    "Explain the programming concept of {what} in {language}."
)
prompt = prompt_template.format(what="loop", language="python")

completion = model.invoke(prompt)

print(completion)
