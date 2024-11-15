import { IAlbum } from '../Album/IAlbum'
import { IArtist } from '../Artist/IArtist'
import { IGenres } from '../Genres/IGenres'

export interface ITrack {
  _id: string
  album: IAlbum
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  genre: IGenres
  owners: IArtist[]
  created_at: string
  updated_at: string
}
