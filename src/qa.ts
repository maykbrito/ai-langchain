import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings }from 'langchain/embeddings/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';

import * as dotenv from 'dotenv'
dotenv.config()

const query = "Como funciona a técnica do pomodoro?"

const directory = 'data'

// Load the vector store from the same directory
const loadedVectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings());

// vectorStore and loadedVectorStore are identical
// const result = await loadedVectorStore.similaritySearch(query, 1);
// console.log(result);

// Create a chain that uses the OpenAI LLM and HNSWLib vector store.
const model  = new OpenAI()
const chain = RetrievalQAChain.fromLLM(model, loadedVectorStore.asRetriever());
const res = await chain.call({ query });
console.log({ res });