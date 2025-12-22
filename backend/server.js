import 'dotenv/config'
import express from 'express'
import taskRoute from './routes/tasks.js'
import cors from 'cors'
import corsConfig from './config/cors.js'
import errorHandler from './utils/errors.js'

const app = express()

app.use(cors(corsConfig))
app.use(express.json())
app.use('/api', taskRoute)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('<h1>Welcome to scraper backend</h1>')
})

app.listen(4000, () => {
  console.log('listening on port 4000')
})
