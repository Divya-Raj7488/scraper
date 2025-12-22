import { GoogleGenAI } from '@google/genai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing from environment variables')
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const getAnswerFromGemini = async question => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: question,
    config: {
      thinkingConfig: {
        thinkingBudget: 0
      }
    }
  })

  return response.candidates[0].content.parts[0].text
}

export default getAnswerFromGemini
