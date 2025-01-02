import { ObjectId } from 'mongodb'

interface TrackType {
  _id?: ObjectId
  album_id?: string
  name: string
  image?: string
  description?: string
  lyrics?: string
  path_audio: string
  listen?: number
  genre: ObjectId
  created_at?: Date
  updated_at?: Date
}

export default class Track {
  _id?: ObjectId
  album_id: string
  name: string
  image: string
  description: string
  lyrics: string
  path_audio: string
  listen: number
  genre: ObjectId
  created_at: Date
  updated_at: Date
  constructor({
    _id,
    album_id,
    listen,
    name,
    path_audio,
    created_at,
    description,
    image,
    lyrics,
    genre,
    updated_at
  }: TrackType) {
    const date = new Date()
    this._id = _id
    this.album_id = album_id || ''
    this.name = name
    this.image = image || ''
    this.description = description || ''
    this.lyrics = lyrics || ''
    this.path_audio = path_audio
    this.listen = listen || 0
    this.genre = genre
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
