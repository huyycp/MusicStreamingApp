import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { AUTH_MESSAGES } from '~/constants/messages'
import {
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  TokenPayLoad,
  VerifyEmailReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/Auth.requests'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.services'
import databaseService from '~/services/database.services'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await authService.register(req.body)
  return res.json({
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
  const { refresh_token } = req.body
  const result = await authService.logout(refresh_token)
  return res.json(result)
}

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad
  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: AUTH_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.email_verify_token === '') {
    return res.json({
      message: AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await authService.verifyEmail(user_id)
  return res.json({
    message: AUTH_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: AUTH_MESSAGES.USER_NOT_FOUND
    })
  }
  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  const result = await authService.resendVerifyEmail(user_id, user.email)
  return res.json(result)
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
  return res.json({
    message: AUTH_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}
