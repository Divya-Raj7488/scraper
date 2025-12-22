import { GoogleGenAI } from '@google/genai'
import safetyConfig from '../config/llmSafetyConfig.js'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing from environment variables')
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const getAnswerFromGemini = async (question, content) => {
  const fullPrompt = createPrompt(question, content);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    config: {
      thinkingConfig: {
        thinkingBudget: 0
      },
      safetySettings: safetyConfig
    }
  })

  return response.candidates[0].content.parts[0].text
}

function createPrompt (question, content) {
  return `
    You are a helpful assistant. Use the provided context below to answer the user's question.
    
    GUIDELINES:
    - Only use the information in the [CONTEXT] section.
    - If context is empty string, say "Please provide a context."
    - If the answer is not in the context, say "I'm sorry, I don't have that information."
    - Do not make up facts.
    
    [CONTEXT]
    ${content}
    
    [USER QUESTION]
    ${question}
  `
}

export default getAnswerFromGemini
