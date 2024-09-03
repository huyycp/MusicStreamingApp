import express, { Request, Response } from 'express'
import cors from 'cors'
import { envConfig } from './constants/config'

const app = express()
const port = envConfig.port

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Music Streaming App')
})

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
