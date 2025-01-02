export interface IListTrack {
  message: string
  result: Result
}

interface Result {
  data: Datum[]
  meta: Meta
}

interface Meta {
  items_per_page: number
  total_items: number
  current_page: number
  total_pages: number
}

export interface Datum {
  _id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  genre: Genre
  created_at: string
  updated_at: string
  album: Record<string, unknown>
  owners: Owner[]
  status: string
}

interface Owner {
  _id: string
  role: number
  name: string
  email: string
  gender: string
  created_at: string
  updated_at: string
  verify: number
  avatar: string
}

interface Genre {
  _id: string
  name: string
  created_at: string
  updated_at: string
  image: string
}

export interface IDetailTrack {
  message: string
  result: ResultDetailTrack
}

export interface ResultDetailTrack {
  _id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  weekly_listen: number
  created_at: string
  updated_at: string
  genre: Genre
  owners: Owner[]
  status: string
}

export interface IListTrackOfAlbum {
  message: string
  result: ResultListTrackOfAlbum
}

export interface ResultListTrackOfAlbum {
  data: Datum[]
  meta: Meta
}
