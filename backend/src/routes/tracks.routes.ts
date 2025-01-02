import { Router } from 'express'
import * as controller from '~/controllers/tracks.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { trackIdValidator, verifiedArtistValidator } from '~/middlewares/tracks.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tracksRouter = Router()
/**
 * Description. Get all tracks
 * Path: /
 * Method: GET
 */
tracksRouter.get('/', wrapRequestHandler(controller.getTracksController))

/**
 * Description. Get list tracks by artists (artist)
 * Path: /my-tracks
 * Header: { Authorization: Bearer <access_token> }
 * Method: GET
 */
tracksRouter.get(
  '/my-tracks',
  accessTokenValidator,
  verifiedArtistValidator,
  wrapRequestHandler(controller.getTrackByArtistController)
)

/**
 * Description. Get detail track
 * Path: /:track_id
 * Method: GET
 */
tracksRouter.get('/:track_id', trackIdValidator, wrapRequestHandler(controller.getDetailTrackController))

/**
 * Description. Create track (artist)
 * Path: /
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, lyrics?: string, description?: string, image?: file, audio: file }
 * Method: POST
 */
tracksRouter.post(
  '/',
  accessTokenValidator,
  verifiedArtistValidator,
  wrapRequestHandler(controller.createTrackController)
)

export default tracksRouter
