export interface IUserAlbums {
  message: string
  result: ResultUserAlbums
}

interface ResultUserAlbums {
  data: DatumUserAlbums[]
  meta: Meta
}

interface Meta {
  items_per_page: number
  total_items: number
  current_page: number
  total_pages: number
}

interface DatumUserAlbums {
  _id: string
  name: string
  image: string
  created_at: string
  updated_at: string
  owners: Owner[]
  number_of_tracks: number
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

export interface IDetailAlbum {
  message: string
  result: ResultDetailAlbum
}

export interface ResultDetailAlbum {
  _id: string
  name: string
  type: string
  image: string
  created_at: string
  updated_at: string
  owners: Owner[]
  list_of_tracks: Listoftrack[]
}

interface Listoftrack {
  _id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  created_at: string
  updated_at: string
  status: string
  genre: Genre
  album: Album
  owners: Owner[]
}

interface Album {
  _id: string
  name: string
  type: string
  image: string
  user_id: string
  favorite: boolean
  tracks: string[]
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
