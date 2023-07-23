import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings }from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter }from 'langchain/text_splitter'
import { TextLoader } from 'langchain/document_loaders/fs/text'

import * as dotenv from 'dotenv'
dotenv.config()

const FILENAME =  'src/transc.txt'

const loadRawDoc = async () => {
  const loader = new TextLoader(FILENAME)
  return loader.load()
}

const splitText = async (rawdocs: any) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  })

  return textSplitter.splitDocuments(rawdocs)
}

const createVectorStore = async(docs: any) => {
  console.log('creating vector store')
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())
  await vectorStore.save('data')
}

export const run = async() => {
  const rawdocs = await loadRawDoc()
  console.log('loader created')
  
  const docs = await splitText(rawdocs)
  console.log('doc splitted')

  await createVectorStore(docs)
  console.log('data created')
}