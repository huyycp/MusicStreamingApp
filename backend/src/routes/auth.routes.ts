import { Router } from 'express'
import * as controller from '~/controllers/auth.controllers'
import {
  accessTokenValidator,
  emailValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/auth.middewares'
import { wrapRequestHandler } from '~/utils/handlers'

const authRouter = Router()
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { role: string, name: string, email: string, password: string, gender: string }
 */
authRouter.post('/register', registerValidator, wrapRequestHandler(controller.registerController))

/**
 * Description. Get all email
 * Path: /email
 * Method: GET
 */
authRouter.get('/email', wrapRequestHandler(controller.getEmailController))

/**
 * Description. Check exist email
 * Path: /email
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/email', emailValidator, wrapRequestHandler(controller.checkEmailController))

/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
authRouter.post('/login', loginValidator, wrapRequestHandler(controller.loginController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
authRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(controller.logoutController))

export default authRouter
