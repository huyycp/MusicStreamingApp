import express from 'express'
import cors from 'cors'
import { envConfig } from './constants/config'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import authRouter from './routes/auth.routes'

const app = express()
const port = envConfig.port

databaseService.connect().then(() => {
  databaseService.indexVerify()
})

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
