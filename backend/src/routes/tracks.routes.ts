import { Router } from 'express'
import * as controller from '~/controllers/tracks.controllers'
import { trackIdValidator } from '~/middlewares/tracks.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tracksRouter = Router()
/**
 * Description. Get all track
 * Path: /get-list-track
 * Method: GET
 */
tracksRouter.get('/get-list-track', wrapRequestHandler(controller.getTracksController))

/**
 * Description. Get detail track
 * Path: /:track_id
 * Method: GET
 */
tracksRouter.get('/:track_id', trackIdValidator, wrapRequestHandler(controller.getDetailTrackController))

export default tracksRouter
