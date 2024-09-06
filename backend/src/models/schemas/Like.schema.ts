import { ObjectId } from 'mongodb'

interface LikeType {
  _id?: ObjectId
  user_id: ObjectId
  track_id: ObjectId
  created_at?: Date
}
export default class Like {
  _id?: ObjectId
  user_id: ObjectId
  track_id: ObjectId
  created_at: Date
  constructor({ _id, user_id, track_id, created_at }: LikeType) {
    this._id = _id
    this.user_id = user_id
    this.track_id = track_id
    this.created_at = created_at || new Date()
  }
}
