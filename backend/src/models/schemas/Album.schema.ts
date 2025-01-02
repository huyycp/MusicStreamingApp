import { ObjectId } from 'mongodb'

interface AlbumType {
  _id?: ObjectId
  name: string
  image?: string
  created_at?: Date
  updated_at?: Date
}

export default class Album {
  _id?: ObjectId
  name: string
  image: string
  created_at: Date
  updated_at: Date
  constructor({ _id, name, image, created_at, updated_at }: AlbumType) {
    const date = new Date()
    this._id = _id
    this.name = name
    this.image = image || ''
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}
