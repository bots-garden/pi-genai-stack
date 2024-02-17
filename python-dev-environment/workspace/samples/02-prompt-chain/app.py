import os

from langchain_community.llms import ollama
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

ollama_base_url = os.getenv("OLLAMA_BASE_URL")

model = ollama.Ollama(
    base_url=ollama_base_url, 
    model='tinydolphin',
)

what = "loop"
language = "python"

# Prompt template
prompt = PromptTemplate.from_template(
    "Explain the programming concept of {what} in {language}."
)

# Chain using model and formatting          
chain = prompt | model | StrOutputParser()    

response = chain.invoke({"what": what, "language": language})  

print(response)
