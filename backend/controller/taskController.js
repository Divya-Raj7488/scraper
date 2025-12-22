import getAnswerFromGemini from '../services/askGemini.js'
import { scrapeDataFromUrl } from '../services/scrape.js'

//scrape details and
const scrapeAndAskGemini = async (req, res, next) => {
  try {
    const { url: uri, question } = req.body
    if (!uri) {
      return res.status(400).json({
        message: 'Please enter the url!'
      })
    }
    const { title, content } = await scrapeDataFromUrl(uri)

    const questionWithContext = `about ${title}, ${question}`

    const geminiResponse = await getAnswerFromGemini(questionWithContext)

    return res.status(200).json({ message: geminiResponse })
  } catch (err) {
    next(err)
  }
}

export default scrapeAndAskGemini
