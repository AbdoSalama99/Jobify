import 'express-async-errors' // handle async error
// meddelwares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import { authenticateUser } from './middlewares/authMiddleware.js'

// security packages
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

import express from 'express'
const app = express()

// access .env file and use it
import morgan from 'morgan'
import * as dotenv from 'dotenv'

import mongoose from 'mongoose'
import cloudinary from 'cloudinary'

//public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//Routers
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// cookie Parser
import cookieParser from 'cookie-parser'
app.use(cookieParser())

app.use(express.json())

// security packages
app.use(helmet())
app.use(mongoSanitize())

dotenv.config()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/dist')))

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' })
})

app.post('/', (req, res) => {
  console.log(req)
  res.json({ message: 'Data received', data: req.body })
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use('/api/v1/users', authenticateUser, userRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

// NOT FOUND
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

// error router
app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URL)
  const port = process.env.PORT || 5100
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
