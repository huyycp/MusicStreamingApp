import { Request, Response, NextFunction } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
import userService from '~/services/users.services'

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const user = await userService.getMe(user_id)
  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: user
  })
}
