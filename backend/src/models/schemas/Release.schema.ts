import { ObjectId } from 'mongodb'

interface ReleaseType {
  _id?: ObjectId
  artist_id: ObjectId
  product_id: ObjectId
  created_at?: Date
}

export default class Release {
  _id?: ObjectId
  artist_id: ObjectId
  product_id: ObjectId
  created_at: Date
  constructor({ _id, artist_id, product_id, created_at }: ReleaseType) {
    this._id = _id
    this.artist_id = artist_id
    this.product_id = product_id
    this.created_at = created_at || new Date()
  }
}
