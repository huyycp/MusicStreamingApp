import { Router } from 'express'
import * as controller from '~/controllers/tracks.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { artistIdValidator, trackIdValidator, verifiedArtistValidator } from '~/middlewares/tracks.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tracksRouter = Router()
/**
 * Description. Get all tracks
 * Path: /get-list-tracks
 * Method: GET
 */
tracksRouter.get('/get-list-tracks', wrapRequestHandler(controller.getTracksController))

/**
 * Description. Get detail track
 * Path: /:track_id
 * Method: GET
 */
tracksRouter.get('/:track_id', trackIdValidator, wrapRequestHandler(controller.getDetailTrackController))

/**
 * Description. Create track
 * Path: /create-track
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, lyrics?: string, description?: string, image?: file, audio: file }
 * Method: POST
 */
tracksRouter.post(
  '/create-track',
  accessTokenValidator,
  verifiedArtistValidator,
  wrapRequestHandler(controller.createTrackController)
)

/**
 * Description. Get list tracks by artists
 * Path: /artist/:artist_id
 * Method: GET
 */
tracksRouter.get('/artist/:artist_id', artistIdValidator, wrapRequestHandler(controller.getTrackByArtistController))

export default tracksRouter
