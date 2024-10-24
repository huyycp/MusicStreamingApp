import express from 'express'
import cors from 'cors'
import { envConfig } from './constants/config'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import authRouter from './routes/auth.routes'
import tracksRouter from './routes/tracks.routes'
import { initFolder } from './utils/files'
import albumsRouter from './routes/albums.routes'
import usersRouter from './routes/users.routes'
import genresRouter from './routes/genres.routes'

const app = express()
const port = envConfig.port

databaseService.connect().then(() => {
  databaseService.indexVerify()
})

initFolder()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/tracks', tracksRouter)
app.use('/albums', albumsRouter)
app.use('/users', usersRouter)
app.use('/genres', genresRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
