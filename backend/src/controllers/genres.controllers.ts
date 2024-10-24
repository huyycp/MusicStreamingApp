import { Request, Response, NextFunction } from 'express'
import { GENRES_MESSAGES } from '~/constants/messages'
import genreService from '~/services/genres.services'
export const getGenresController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await genreService.getListGenre()
  return res.json({
    message: GENRES_MESSAGES.GET_LIST_OF_GENRES_SUCCESS,
    result
  })
}
