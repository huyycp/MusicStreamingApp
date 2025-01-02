export interface IDataReportTrack {
  _id: string
  count: number
  name: string
  status: string
  gender: string
  album: {
    _id: string
    name: string
    type: string
    image: string
    user_id: string
    favorite: boolean
    tracks: []
    created_at: string
    updated_at: string
  }
  owners: [
    {
      _id: string
      role: number
      name: string
      email: string
      gender: string
      created_at: string
      updated_at: string
      verify: 0 | 1
      avatar: string
    }
  ]
}

export interface ITrackReport {
  _id: string
  reported_item_id: string
  reported_item_type: string
  reason: string
  subject: string
  body: string
  status: string
  created_at: string
  reporters: {
    _id: string
    role: number
    name: string
    email: string
    gender: string
    created_at: string
    updated_at: string
    verify: 0 | 1
    avatar: string
  }
}

export interface ITrackInfo {
  _id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  created_at: string
  updated_at: string
  genre: Genre
  album: Album
  owners: Owner[]
  status: string
  number_of_violations: number
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

interface Album {
  _id: string
  name: string
  type: string
  image: string
  user_id: string
  favorite: boolean
  tracks: []
  created_at: string
  updated_at: string
}

interface Genre {
  _id: string
  name: string
  created_at: string
  updated_at: string
  image: string
}

export interface IReportTrack {
  message: string
  result: ResultReportTrack
}

interface ResultReportTrack {
  data: DatumReportTrack[]
  meta: Meta
}

interface Meta {
  items_per_page: number
  total_items: number
  current_page: number
  total_pages: number
}

export interface DatumReportTrack {
  _id: string
  count: number
  status: string
  name: string
  album: Album
  owners: Owner[]
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

interface Album {
  _id: string
  name: string
  type: string
  image: string
  user_id: string
  favorite: boolean
  tracks: []
  created_at: string
  updated_at: string
}

export interface IDetailReport {
  message: string
  result: Result
}

export interface Result {
  _id: string
  reported_item_id: string
  reported_item_type: string
  reason: string[]
  subject: string
  body: string
  image: string[]
  path_audio: string
  status: string
  created_at: string
  reporters: Reporters
  rejection_reason: string
  tracks: ITrackInfo
}

interface Reporters {
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
