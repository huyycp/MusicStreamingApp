import { Router } from 'express'
import * as controller from '~/controllers/albums.controller'
import { addTrackIdValidator, albumIdValidator } from '~/middlewares/albums.middlewares'
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

/**
 * Description. Get list albums by artists (artist)
 * Path: /my-albums
 * Header: { Authorization: Bearer <access_token> }
 * Method: GET
 */
albumsRouter.get(
  '/my-albums',
  accessTokenValidator,
  verifiedArtistValidator,
  wrapRequestHandler(controller.getAlbumByArtistController)
)

/**
 * Description. Get detail album
 * Path: /:album_id
 * Method: GET
 */
albumsRouter.get('/:album_id', albumIdValidator, wrapRequestHandler(controller.getDetailAlbumController))

/**
 * Description. Add tracks to album
 * Path: /:album_id/tracks
 * Header: { Authorization: Bearer <access_token> }
 * Method: PATCH
 */
albumsRouter.patch(
  '/:album_id/tracks',
  accessTokenValidator,
  verifiedArtistValidator,
  albumIdValidator,
  addTrackIdValidator,
  wrapRequestHandler(controller.addTrackToAlbumController)
)

export default albumsRouter
