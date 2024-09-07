import { Router } from 'express'
import * as controller from '~/controllers/auth.controllers'
import {
  accessTokenValidator,
  emailValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
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
authRouter.get('/get-list-email', wrapRequestHandler(controller.getEmailController))

/**
 * Description. Check exist email
 * Path: /check-email
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/check-email', emailValidator, wrapRequestHandler(controller.checkEmailController))

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

/**
 * Description. Send verify email when user client register
 * Path: /get-otp-verify
 * Method: POST
 * Body: { email: string }
 */
authRouter.post('/get-otp-verify', emailValidator, wrapRequestHandler(controller.sendVerifyEmailController))

/**
 * Description. Verify email
 * Path: /verify-email
 * Method: POST
 * Body: { email: string, otp: string }
 */
authRouter.post('/verify-email', emailValidator, wrapRequestHandler(controller.verifyEmailController))

/**
 * Description. Resend verify email when user client click on button resend
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
authRouter.post(
  '/resend-verify-email',
  accessTokenValidator,
  wrapRequestHandler(controller.resendVerifyEmailController)
)

/**
 * Description. Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
authRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(controller.forgotPasswordController))

/**
 * Description. Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */
authRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(controller.verifyForgotPasswordController)
)

/**
 * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Body: {forgot_password_token: string, password: string}
 */
authRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(controller.resetPasswordController))

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(controller.refreshTokenController))

export default authRouter
