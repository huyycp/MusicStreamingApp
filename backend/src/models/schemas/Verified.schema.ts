import { ObjectId } from 'mongodb'

interface VerifiedType {
  _id?: ObjectId
  email: string
}

export default class Verified {
  _id?: ObjectId
  email: string
  constructor({ _id, email }: VerifiedType) {
    this._id = _id
    this.email = email
  }
}
