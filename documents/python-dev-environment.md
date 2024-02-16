# Python Dev Environment

**Python Dev Environment** is a Web IDE with all the needed dependencies to start developing LangChain applications.

## First program

Create a `demo1.py` file with the following content:

```python
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
```

Run it with this command: `python3 demo1.py`

## Second program

Create a `demo2.py` file with the following content:

```python
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

prompt = "Who is Bram Stoker?"

llm.invoke(prompt)

print('\n')
```

Run it with this command: `python3 demo2.py`
