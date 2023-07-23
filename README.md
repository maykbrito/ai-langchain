# Langchain

## Ingest

Create your own database to be used with AI

the `pnpm ingest` command will use a .txt file (src/transc.txt), split the text in chunks of 200 chars, and with HNSWLib, it will create a vector store in data directory to be used as database for later consume

## QA

Use your database as Q&A source

the `pnpm qa` command will use your vector store database in the `data` directory, loaded with HNSWLib and OpenAI Embeddings, so we can ask anything in the context of database content
