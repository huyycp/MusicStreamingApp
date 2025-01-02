import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TrackParams extends ParamsDictionary {
  track_id: string
}

export interface Pagination {
  limit: string
  page: string
}

export interface ArtistParams extends ParamsDictionary {
  artist_id: string
}

export interface ArtistQuery extends Pagination, Query {
  status: string
}
