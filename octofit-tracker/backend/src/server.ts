import express from 'express'
import db, { connectDatabase } from './config/database.js'
import apiRouter from './routes.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected' })
})

app.use('/api', apiRouter)

await connectDatabase()

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`)
})