import { ObjectId } from 'mongodb'

interface PlaylistType {
  _id?: ObjectId
  user_id: ObjectId
  name?: string
  favorite?: boolean
  track?: ObjectId[]
  created_at?: Date
  update_at?: Date
}

export default class Playlist {
  _id?: ObjectId
  user_id: ObjectId
  name: string
  favorite: boolean
  track: ObjectId[]
  created_at: Date
  updated_at: Date
  constructor({ _id, user_id, name, favorite, track, created_at, update_at }: PlaylistType) {
    const date = new Date()
    this._id = _id
    this.user_id = user_id
    this.name = name || ''
    this.favorite = favorite || false
    this.track = track || []
    this.created_at = created_at || date
    this.updated_at = update_at || date
  }
}
