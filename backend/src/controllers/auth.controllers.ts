import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { AUTH_MESSAGES } from '~/constants/messages'
import { LoginReqBody, RegisterReqBody } from '~/models/requests/Auth.requests'
import User from '~/models/schemas/User.schema'
import authService from '~/services/auth.services'

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
