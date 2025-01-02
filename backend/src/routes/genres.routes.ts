import { Router } from 'express'
import * as controller from '~/controllers/genres.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { addGenreIdValidator } from '~/middlewares/genres.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const genresRouter = Router()
/**
 * Description. Get list of genres
 * Path: /
 * Method: GET
 */
genresRouter.get('/', wrapRequestHandler(controller.getGenresController))

/**
 * Description. Add genres to favorite
 * Path: /favorite
 * Method: PATCH
 */
genresRouter.patch(
  '/favorite',
  accessTokenValidator,
  addGenreIdValidator,
  wrapRequestHandler(controller.addGenresToFavor)
)

export default genresRouter
