import { ParamsDictionary } from 'express-serve-static-core'

export interface DetailTrackReqParams extends ParamsDictionary {
  track_id: string
}
