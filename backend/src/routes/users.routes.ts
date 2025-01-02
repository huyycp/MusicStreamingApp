import { Router } from 'express'
import * as controller from '~/controllers/users.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/**
 * Description: Get my profile
 * Path: /me
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(controller.getMeController))

export default usersRouter
