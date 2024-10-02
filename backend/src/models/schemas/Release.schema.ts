import { ObjectId } from 'mongodb'
import { ProductType } from '~/constants/enums'

interface ReleaseType {
  _id?: ObjectId
  artist_id: ObjectId
  product_id: ObjectId
  product_type: ProductType
  created_at?: Date
}

export default class Release {
  _id?: ObjectId
  artist_id: ObjectId
  product_id: ObjectId
  product_type: ProductType
  created_at: Date
  constructor({ _id, artist_id, product_id, product_type, created_at }: ReleaseType) {
    this._id = _id
    this.artist_id = artist_id
    this.product_id = product_id
    this.product_type = product_type
    this.created_at = created_at || new Date()
  }
}
