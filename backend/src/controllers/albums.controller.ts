import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { ALBUMS_MESSAGES } from '~/constants/messages'
import { AddTrackReqBody, AlbumIdParams, AlbumPagination } from '~/models/requests/Album.requests'
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

export const getAlbumByArtistController = async (
  req: Request<ParamsDictionary, any, any, AlbumPagination>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const result = await albumService.getAlbumByArtist({ user_id, limit, page })
  return res.json({
    message: ALBUMS_MESSAGES.GET_LIST_ALBUMS_BY_ARTIST_SUCCESS,
    result: {
      data: result.albums,
      meta: {
        items_per_page: limit,
        total_items: result.total,
        current_page: page,
        total_pages: Math.ceil(result.total / limit)
      }
    }
  })
}

export const getDetailAlbumController = async (req: Request<AlbumIdParams>, res: Response, next: NextFunction) => {
  const { album_id } = req.params
  const result = await albumService.getDetailAlbum(album_id)
  return res.json({
    message: ALBUMS_MESSAGES.GET_DETAIL_ALBUM_SUCCESS,
    result: {
      album_info: result.album[0],
      list_of_tracks: result.list_of_tracks
    }
  })
}

export const addTrackToAlbumController = async (
  req: Request<AlbumIdParams, any, AddTrackReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { album_id } = req.params
  const { track_list } = req.body
  await albumService.addTrackToAlbum({ album_id, track_list })
  return res.json({
    message: ALBUMS_MESSAGES.ADD_TRACKS_TO_ALBUM_SUCCESS
  })
}

export const getAlbumsController = async (
  req: Request<ParamsDictionary, any, any, AlbumPagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const result = await albumService.getListAlbum({
    limit,
    page
  })
  return res.json({
    message: ALBUMS_MESSAGES.GET_LIST_ALBUMS_SUCCESS,
    result: {
      data: result.albums,
      meta: {
        items_per_page: limit,
        total_items: result.total,
        current_page: page,
        total_pages: Math.ceil(result.total / limit)
      }
    }
  })
}
