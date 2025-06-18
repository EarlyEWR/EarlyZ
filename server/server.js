import express from 'express'
import { authRouter } from './src/routes/authRoutes.js'
import bookRouter from './src/routes/bookRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT || 5000

// Custom CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
)

// JSON Middleware
app.use(express.json())

// Routes
app.use('/auth', authRouter)
app.use('/api/books', bookRouter)

// Health Check Route
app.get('/api/ping', (req, res) => {
  res.send({
    msg: 'Hello, World',
  })
})

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
