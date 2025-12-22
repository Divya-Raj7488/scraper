import axios from 'axios'
import * as cheerio from 'cheerio'

const scrapeDataFromUrl = async uri => {
  const { data: html } = await axios.get(uri)
  const $ = cheerio.load(html)

  $('script').remove()
  $('style').remove()
  $('noscript').remove()

  const title = $('title').text()
  const bodyText = $('body').text()

  return { title, content: bodyText }
}

export { scrapeDataFromUrl }
