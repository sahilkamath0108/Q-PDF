import torch
from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms import HuggingFaceLLM
from llama_index.prompts.prompts import SimpleInputPrompt

from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from llama_index import ServiceContext
from llama_index.embeddings import LangchainEmbedding

embed_model = LangchainEmbedding(
    HuggingFaceEmbeddings(model_name = 'sentence-transformers/all-mpnet-base-v2')
)

sys_prompt = """
  You are a Q&A assistant. Your goal is to answer questions as accurately as possible based on
  the instructions and context provided.
"""

query_wrapper_prompt = SimpleInputPrompt("<|USER|>{query_str}<|ASSISTANT|>")

llm = HuggingFaceLLM(
    context_window = 4096,
    max_new_tokens = 256,
    generate_kwargs = {"temperature" : 0.0, "do_sample" : False},
    system_prompt = sys_prompt,
    query_wrapper_prompt = query_wrapper_prompt,
    tokenizer_name = 'meta-llama/Llama-2-7b-chat-hf',
    model_name = 'meta-llama/Llama-2-7b-chat-hf',
    device_map = 'auto',
    model_kwargs = {'torch_dtype' : torch.float32}
)
print('hi1')

service_context = ServiceContext.from_defaults(
    chunk_size = 1024,
    llm = llm,
    embed_model = embed_model
)
print('hi2')
docs = SimpleDirectoryReader('./test_docs').load_data()
print('hi3')
index = VectorStoreIndex.from_documents(docs)
print('hi4')
index.storage_context.persist()
print('hi5')

query_engine = index.as_query_engine()


resp = query_engine.query('What is KDD process')

print(resp)