export interface ITrack {
  _id: string
  album_id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  artistsName: string[]
  created_at: string
  updated_at: string
}
