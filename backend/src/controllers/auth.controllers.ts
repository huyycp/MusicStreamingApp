import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { result } from 'lodash'
import { AUTH_MESSAGES } from '~/constants/messages'
import { RegisterReqBody } from '~/models/requests/Auth.requests'
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
