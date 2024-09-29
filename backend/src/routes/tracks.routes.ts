import { Router } from 'express'
import * as controller from '~/controllers/tracks.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { trackIdValidator } from '~/middlewares/tracks.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tracksRouter = Router()
/**
 * Description. Get all tracks
 * Path: /get-list-track
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
 * Header: { Authorization: Bearer <access_token>
 * Body: { name: string, audio: file }
 * Method: POST
 */
tracksRouter.post('/create-track', accessTokenValidator, wrapRequestHandler(controller.createTrackController))

export default tracksRouter
