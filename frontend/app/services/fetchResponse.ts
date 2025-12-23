import axios from 'axios'

export const askScraper = async (url: string, question: string) => {
  const response = await axios.post('http://localhost:4000/api/ask', {
    url,
    question: question
  })
  return response.data
}
