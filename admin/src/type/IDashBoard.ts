export default interface IDashBoard {
  message: string
  result: Result
}

export interface Result {
  total_artist: number
  total_listener: number
  total_album: number
  total_track: number
  genre_ratios: Genreratio[] | null
  top_track: TopTrack[]
}

export interface Genreratio {
  genre: string
  ratio: number
}

export interface TopTrack {
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
  status: string
  weekly_listen: number
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

interface Genre {
  _id: string
  name: string
  created_at: string
  updated_at: string
  image: string
}

export interface ITopAlbum {
  message: string
  result: ResultTopAlbum[]
}

export interface ResultTopAlbum {
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
  genre: Genre
  is_deleted: boolean
  created_at: string
  updated_at: string
  status: string
  weekly_listen: number
  album: Album
  owners: Owner[]
}

export interface ITopArtist {
  message: string;
  result: ResultTopArtist[];
}

export interface ResultTopArtist {
  _id: string;
  role: number;
  name: string;
  email: string;
  gender: string;
  created_at: string;
  updated_at: string;
  verify: number;
  avatar: string;
  genres: GenreAT[];
  premium: string;
  number_of_following: number;
  number_of_followers: number;
}

interface GenreAT {
  _id: string;
  name: string;
  image: string;
}

export interface ISearch {
  message: string;
  result: ResultSearch;
}

export interface ResultSearch {
  tracks: Track[];
  artists: Artist[];
  albums: Album2[];
}

interface Album2 {
  _id: string;
  name: string;
  type: string;
  image: string;
  created_at: string;
  updated_at: string;
  owners: Owner[];
  number_of_tracks: number;
}

export interface Artist {
  _id: string;
  role: number;
  name: string;
  email: string;
  gender: string;
  created_at: string;
  updated_at: string;
  verify: number;
  avatar: string;
  genres: Genre2[];
  premium: string;
}

interface Genre2 {
  _id: string;
  name: string;
  image: string;
}

export interface Track {
  _id: string;
  name: string;
  image: string;
  description: string;
  lyrics: string;
  path_audio: string;
  listen: number;
  created_at: string;
  updated_at: string;
  genre: Genre;
  album: Album;
  owners: Owner[];
}
