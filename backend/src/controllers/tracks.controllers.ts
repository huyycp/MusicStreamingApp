import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { TRACKS_MESSAGES } from '~/constants/messages'
import { TokenPayLoad } from '~/models/requests/Auth.requests'
import { DetailTrackReqParams } from '~/models/requests/Track.requests'
import trackService from '~/services/tracks.services'

export const getTracksController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await trackService.getListTrack()
  return res.json({
    message: TRACKS_MESSAGES.GET_LIST_TRACK_SUCCESS,
    result
  })
}

export const getDetailTrackController = async (
  req: Request<DetailTrackReqParams>,
  res: Response,
  next: NextFunction
) => {
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
