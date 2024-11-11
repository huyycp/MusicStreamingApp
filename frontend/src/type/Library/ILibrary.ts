import { IArtist } from '../Artist/IArtist'

export interface ILibrary {
  _id: string
  name: string
  image: string
  user_id?: string
  type: 'album' | 'playlist'
  number_of_tracks: number
  owners?: IArtist[]
  favorite?: boolean
  created_at: string
  updated_at: string
}
