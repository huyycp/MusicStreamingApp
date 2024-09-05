import { Router } from 'express'
import * as controller from '~/controllers/auth.controllers'
import { emailValidator, loginValidator, registerValidator } from '~/middlewares/auth.middewares'
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

export default authRouter
