import * as dotenv from 'dotenv'
dotenv.config()

import { OpenAI } from 'langchain/llms/openai'
import { SerpAPI } from 'langchain/tools'

import { initializeAgentExecutorWithOptions } from 'langchain/agents'

const model = new OpenAI({})

const tools = [
	new SerpAPI(process.env.SERPAPI_API_KEY, {
		hl: 'pt-br',
		gl: 'br'
	})
]

// this agentType will only get the information and stop there
// we can use other types to interact, like chat, for example
const agentType = 'zero-shot-react-description'
// to see every step that the executor are doing
const verbose = true

const executor = await initializeAgentExecutorWithOptions(
	tools, model, {agentType, verbose})

const res = await executor.call({input: "Who is Mayk Brito?"})
console.log(res.output)