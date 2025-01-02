import { IArtist } from '../Artist/IArtist'
import { ITrack } from '../Tracks/ITrack'

export interface ILibrary {
  _id: string
  name: string
  image: string
  user_id?: string
  type: 'album' | 'playlist'
  number_of_tracks: number
  list_of_tracks: ITrack[]
  owners?: IArtist[]
  favorite?: boolean
  created_at: string
  updated_at: string
}
