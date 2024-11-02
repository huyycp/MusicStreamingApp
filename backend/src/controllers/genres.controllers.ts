import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { GENRES_MESSAGES } from '~/constants/messages'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
import { AddGenresReqBody } from '~/models/requests/Genre.requests'
import genreService from '~/services/genres.services'

export const getGenresController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await genreService.getListGenre()
  return res.json({
    message: GENRES_MESSAGES.GET_LIST_OF_GENRES_SUCCESS,
    result
  })
}

export const addGenresToFavor = async (
  req: Request<ParamsDictionary, any, AddGenresReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const { genres } = req.body
  await genreService.addGenresToFavor({ user_id, genres })
  return res.json({
    message: GENRES_MESSAGES.ADD_GENRES_TO_FAVORITE_SUCCESS
  })
}
