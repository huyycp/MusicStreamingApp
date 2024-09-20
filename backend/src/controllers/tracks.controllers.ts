import { Request, Response, NextFunction } from 'express'
import { TRACKS_MESSAGES } from '~/constants/messages'
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
