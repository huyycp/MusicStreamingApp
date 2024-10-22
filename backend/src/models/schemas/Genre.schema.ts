import { ObjectId } from 'mongodb'
interface GenreType {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at: Date
  image: string
}
export default class Genre {
  _id?: ObjectId
  name: string
  created_at: Date
  updated_at: Date
  image: string
  constructor({ _id, name, created_at, updated_at, image }: GenreType) {
    const date = new Date()
    this._id = _id
    this.name = name
    this.created_at = created_at || date
    this.updated_at = updated_at || date
    this.image = image
  }
}
