import { Router } from 'express'
import * as controller from '~/controllers/albums.controller'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { verifiedArtistValidator } from '~/middlewares/tracks.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const albumsRouter = Router()
/**
 * Description. Create album (artist)
 * Path: /
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, image: file}
 * Method: POST
 */
albumsRouter.post(
  '/',
  accessTokenValidator,
  verifiedArtistValidator,
  wrapRequestHandler(controller.createAlbumController)
)

export default albumsRouter
