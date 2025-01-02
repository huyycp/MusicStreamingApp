import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { envConfig } from '~/constants/config'
import { UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGES } from '~/constants/messages'
import {
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  SendVerifyEmailReqBody,
  TokenPayLoad,
  VerifyEmailReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/Auth.requests'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.services'
import databaseService from '~/services/database.services'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await authService.register(req.body)
  return res.status(HTTP_STATUS.CREATED).json({
    message: AUTH_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const getEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.getListEmail()
  return res.json({
    message: AUTH_MESSAGES.GET_LIST_EMAIL_SUCCESS,
    result
  })
}

export const checkEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  const result = await authService.checkEmailExist(email)
  return res.json({
    message: AUTH_MESSAGES.CHECK_EMAIL_SUCCESS,
    result
  })
}

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await authService.login({ user_id: user_id.toString(), verify: user.verify })
  return res.json({
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const userAgent = (req.headers['user-agent'] || '').split(' ')[0]
  const isMobile = /mobile/i.test(userAgent)
  let refresh_token
  if (isMobile) {
    refresh_token = (req.headers['user-agent'] as string).split(' ')[1]
  } else {
    refresh_token = req.body.refresh_token
  }
  const result = await authService.logout(refresh_token)
  return res.json(result)
}

export const sendVerifyEmailController = async (
  req: Request<ParamsDictionary, any, SendVerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body
  const result = await authService.sendVerifyEmail(email)
  return res.json(result)
}

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, otp } = req.body
  const result = await authService.verifyEmail({ email, otp })
  return res.json({
    message: AUTH_MESSAGES.CHECK_EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id, verify, email } = req.user as User
  const result = await authService.forgotPassword({ user_id: (_id as ObjectId).toString(), verify, email })
  return res.json(result)
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, otp } = req.body
  const result = await authService.verifyForgotPassword({ email, otp })
  return res.json({
    message: AUTH_MESSAGES.CHECK_FORGOT_PASSWORD_VERIFY_SUCCESS,
    result
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body
  const result = await authService.resetPassword(email, password)
  return res.json(result)
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, verify, exp } = req.decoded_refresh_token as TokenPayLoad
  const result = await authService.refreshToken({ user_id, refresh_token, verify, exp })
  return res.json({
    message: AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const oauthController = async (req: Request, res: Response) => {
  const { code } = req.query
  const result = await authService.oauth(code as string)
  const urlRedirect = `${envConfig.clientRedirectCallback}?access_token=${result.access_token}&refresh_token=${result.refresh_token}&new_user=${result.newUser}&verify=${result.verify}`
  return res.redirect(urlRedirect)
}
