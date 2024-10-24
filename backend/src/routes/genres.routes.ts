import { Router } from 'express'
import * as controller from '~/controllers/genres.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const genresRouter = Router()
/**
 * Description. Get list of genres
 * Path: /
 * Method: GET
 */
genresRouter.get('/', wrapRequestHandler(controller.getGenresController))
export default genresRouter
