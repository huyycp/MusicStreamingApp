import { ParamsDictionary } from 'express-serve-static-core'

export interface AlbumIdParams extends ParamsDictionary {
  album_id: string
}

export interface AlbumPagination {
  limit: string
  page: string
}

export interface AlbumArtistParams extends ParamsDictionary {
  artist_id: string
}

export interface AddTrackReqBody {
  track_list: string
}
