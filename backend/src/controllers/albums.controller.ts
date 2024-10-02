import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ALBUMS_MESSAGES } from '~/constants/messages'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
import albumService from '~/services/albums.services'

export const createAlbumController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const result = await albumService.createAlbum({ req, user_id })
  return res.status(HTTP_STATUS.CREATED).json({
    message: ALBUMS_MESSAGES.CREATE_ALBUM_SUCCESS,
    result
  })
}
