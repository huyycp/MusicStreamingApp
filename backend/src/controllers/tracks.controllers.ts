import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { TRACKS_MESSAGES } from '~/constants/messages'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
import { TrackParams, Pagination, ArtistQuery } from '~/models/requests/Track.requests'
import trackService from '~/services/tracks.services'

export const getTracksController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const result = await trackService.getListTrack({
    limit,
    page
  })
  return res.json({
    message: TRACKS_MESSAGES.GET_LIST_TRACKS_SUCCESS,
    result: {
      data: result.tracks,
      meta: {
        items_per_page: limit,
        total_items: result.total,
        current_page: page,
        total_pages: Math.ceil(result.total / limit)
      }
    }
  })
}

export const getDetailTrackController = async (req: Request<TrackParams>, res: Response, next: NextFunction) => {
  const { track_id } = req.params
  const result = await trackService.getDetailTrack(track_id)
  return res.json({
    message: TRACKS_MESSAGES.GET_DETAIL_TRACK_SUCCESS,
    result
  })
}

export const createTrackController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const result = await trackService.createTrack({ req, user_id })
  return res.status(HTTP_STATUS.CREATED).json({
    message: TRACKS_MESSAGES.CREATE_TRACK_SUCCESS,
    result
  })
}

export const getTrackByArtistController = async (
  req: Request<ParamsDictionary, any, any, ArtistQuery>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayLoad
  const limit = Number(req.query.limit) || 5
  const page = Number(req.query.page) || 1
  const status = req.query.status || 'all'
  const result = await trackService.getTrackByArtist({ user_id, limit, page, status })
  return res.json({
    message: TRACKS_MESSAGES.GET_LIST_TRACKS_BY_ARTIST_SUCCESS,
    result: {
      data: result.tracks,
      meta: {
        items_per_page: limit,
        total_items: result.total,
        current_page: page,
        total_pages: Math.ceil(result.total / limit)
      }
    }
  })
}
