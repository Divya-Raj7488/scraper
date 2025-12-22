import axios from 'axios'
import * as cheerio from 'cheerio'

const MAX_CHARS = 10000

const processContent = (rawContent) => {
  const safeContent = rawContent.replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS)
  return safeContent
}

const scrapeDataFromUrl = async (uri, question) => {
  const { data: html } = await axios.get(uri)
  const $ = cheerio.load(html)

  $('script').remove()
  $('style').remove()
  $('noscript').remove()

  const title = $('title').text()
  const bodyText = $('body').text()

  const relevantContent = processContent(bodyText)

  return { title, content: relevantContent }
}

export { scrapeDataFromUrl }
