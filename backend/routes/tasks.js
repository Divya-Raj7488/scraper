import { Router } from 'express'
import scrapeAndAskGemini from '../controller/taskController.js'

const router = Router()

router.post('/ask', scrapeAndAskGemini)

export default router
